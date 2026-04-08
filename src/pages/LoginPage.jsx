import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/menu';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await login(data, returnUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream flex items-center justify-center px-4 pt-16 pb-10 overflow-hidden">
      {/* Blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-0 w-80 h-80 bg-lilac/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 right-0 w-72 h-72 bg-blush/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute top-1/2 right-10 w-48 h-48 bg-mint/15 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-[2rem] border border-lilac/30 shadow-2xl shadow-lilac/10 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              ☕
            </motion.div>
            <h1 className="font-display text-3xl text-purple-900 mb-1">Welcome back</h1>
            <p className="font-body text-sm text-purple-400">
              Sign in to continue your BeansSprout journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              icon="✉️"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email' },
              })}
            />

            <Input
              label="Password"
              type={showPass ? 'text' : 'password'}
              icon="🔒"
              placeholder="Your password"
              autoComplete="current-password"
              error={errors.password?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="text-purple-400 hover:text-purple-600 transition-colors text-base leading-none"
                  tabIndex={-1}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              }
              {...register('password', { required: 'Password is required' })}
            />

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 rounded accent-purple-400 cursor-pointer"
              />
              <span className="font-body text-sm text-purple-500 group-hover:text-purple-700 transition-colors">
                Remember me for 30 days
              </span>
            </label>

            <div className="pt-2">
              <Button type="submit" fullWidth size="lg" loading={loading}>
                Sign in 🌸
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-lilac/30" />
            <span className="font-body text-xs text-purple-300">or</span>
            <div className="flex-1 h-px bg-lilac/30" />
          </div>

          <p className="text-center font-body text-sm text-purple-400">
            New to BeansSprout?{' '}
            <Link to="/signup" className="text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
              Create an account
            </Link>
          </p>
        </div>

        {/* Bottom decoration */}
        <p className="text-center font-body text-xs text-purple-300 mt-5">
          🌸 BeansSprout · Made with love
        </p>
      </motion.div>
    </div>
  );
}
