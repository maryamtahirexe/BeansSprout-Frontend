import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const strengthConfig = [
  { label: 'Too weak',   color: 'bg-red-400',    text: 'text-red-500'    },
  { label: 'Weak',       color: 'bg-orange-400',  text: 'text-orange-500' },
  { label: 'Fair',       color: 'bg-yellow-400',  text: 'text-yellow-600' },
  { label: 'Good',       color: 'bg-mint',        text: 'text-green-600'  },
  { label: 'Strong! 🌟', color: 'bg-green-400',   text: 'text-green-700'  },
];

function getStrength(pass) {
  if (!pass) return 0;
  let score = 0;
  if (pass.length >= 8)          score++;
  if (/[A-Z]/.test(pass))        score++;
  if (/[0-9]/.test(pass))        score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  return score;
}

export default function SignupPage() {
  const { signup, loading } = useAuth();
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passVal,     setPassVal]     = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const strength = getStrength(passVal);
  const cfg      = strengthConfig[strength] || strengthConfig[0];

  const onSubmit = async ({ confirmPassword, ...data }) => {
    await signup(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream flex items-center justify-center px-4 pt-16 pb-10 overflow-hidden">
      {/* Blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-0 right-0 w-80 h-80 bg-blush/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], x: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-mint/15 rounded-full blur-3xl pointer-events-none"
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
              transition={{ duration: 4, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🌸
            </motion.div>
            <h1 className="font-display text-3xl text-purple-900 mb-1">Join BeansSprout</h1>
            <p className="font-body text-sm text-purple-400">
              Create your account to start ordering
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full name"
              type="text"
              icon="🌸"
              placeholder="Your name"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'At least 2 characters' },
              })}
            />

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

            {/* Password with strength */}
            <div>
              <Input
                label="Password"
                type={showPass ? 'text' : 'password'}
                icon="🔒"
                placeholder="Create a strong password"
                autoComplete="new-password"
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
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'At least 8 characters required' },
                  onChange: (e) => setPassVal(e.target.value),
                })}
              />

              {/* Strength bar */}
              {passVal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 space-y-1.5"
                >
                  <div className="flex gap-1.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`flex-1 h-1.5 rounded-full transition-all duration-400 ${
                          i < strength ? cfg.color : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`font-body text-xs ${cfg.text}`}>{cfg.label}</p>
                </motion.div>
              )}
            </div>

            <Input
              label="Confirm password"
              type={showConfirm ? 'text' : 'password'}
              icon="🔒"
              placeholder="Repeat your password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="text-purple-400 hover:text-purple-600 transition-colors text-base leading-none"
                  tabIndex={-1}
                >
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              }
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) => val === watch('password') || 'Passwords do not match',
              })}
            />

            <div className="pt-2">
              <Button type="submit" fullWidth size="lg" loading={loading}>
                Create Account 🌸
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-lilac/30" />
            <span className="font-body text-xs text-purple-300">or</span>
            <div className="flex-1 h-px bg-lilac/30" />
          </div>

          <p className="text-center font-body text-sm text-purple-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center font-body text-xs text-purple-300 mt-5">
          🌸 BeansSprout · Made with love
        </p>
      </motion.div>
    </div>
  );
}
