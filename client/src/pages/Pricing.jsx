import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../configs/api'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Pricing = () => {
    const authState = useSelector(state=>state.auth);
    const {token, user} = authState;
    const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);  

  // Load Razorpay script on component mount
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
      };
      script.onerror = () => {
        setError('Failed to load Razorpay SDK. Please refresh the page.');
      };
      document.body.appendChild(script);
    };

    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      setRazorpayLoaded(true);
    } else {
      loadRazorpay();
    }
  }, []);

  const handlePayment = async (amount) => {
    if(!token){
        toast.error('You must be logged in to make a payment.');
        navigate('/login');
        return;
    }
    try {
      setIsLoading(true);
      setError(null);

      // Validate prerequisites
      if (!razorpayLoaded) {
        throw new Error('Razorpay SDK is still loading. Please wait...');
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK failed to load. Please refresh the page.');
      }

      // 1. Get order details from your backend
      const { data } = await api.post(
        "/api/payment/create-order", 
        { amount }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data || !data.key || !data.order) {
        throw new Error('Invalid response from payment server');
      }

      // 2. Configure Razorpay
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "AI Resume Builder",
        description: "Premium Plan Access",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            setIsLoading(true);
            // 3. Verify payment
            const verifyResponse = await api.post(
              "/api/payment/verify", 
              {
                amount,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }, 
              { 
                headers: { 
                  Authorization: `Bearer ${token}` 
                } 
              }
            );
            
            toast.success('Payment Successful! Your AI features are unlocked.');
            setTimeout(() => {
              window.location.href = "/app";
            }, 1500);
          } catch (verifyError) {
            const errorMsg = verifyError.response?.data?.message || 'Payment verification failed. Please contact support.';
            setError(errorMsg);
            toast.error(errorMsg);
            console.error('Verification error:', verifyError);
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          email: user?.email || '',
          contact: user?.phone || ''
        },
        theme: { color: "#4F46E5" },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Payment failed, please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center py-24 px-6 relative">
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
            &larr; Back to Home
        </Link>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-10 relative z-10 text-center">
        Simple, Transparent Pricing
      </h1>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 w-full max-w-md flex justify-between items-center text-red-400 relative z-10">
          <span>⚠️ {error}</span>
          <button 
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300 text-xl font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative z-10 text-center flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-white mb-2">Pro AI Plan</h2>
        <p className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent mb-8">₹49</p>
        
        <ul className="text-left space-y-4 mb-8 w-full">
          <li className="flex items-center text-slate-300 gap-3"><span className="text-emerald-400">✓</span> Unlimited AI Resume Generation</li>
          <li className="flex items-center text-slate-300 gap-3"><span className="text-emerald-400">✓</span> ATS-Optimized Formatting</li>
          <li className="flex items-center text-slate-300 gap-3"><span className="text-emerald-400">✓</span> Priority Support</li>
          <li className="flex items-center text-slate-300 gap-3"><span className="text-emerald-400">✓</span> Multiple Resume Variants</li>
        </ul>

        {user?.isSubscribed ? (
            <div className="w-full py-4 rounded-xl text-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold mt-auto">
                ✓ Currently Subscribed
            </div>
        ) : (
            <button 
                className="btn-neon w-full py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                onClick={() => handlePayment(49)}
                disabled={isLoading || !razorpayLoaded}
            >
                {isLoading ? 'Processing...' : 'Pay Now'}
            </button>
        )}
        
        {!user?.isSubscribed && (
            <p className="text-sm text-slate-500 mt-6">
                🔒 Secured by Razorpay | No charge until payment is complete
            </p>
        )}
      </div>
    </div>
  );
};

export default Pricing;
