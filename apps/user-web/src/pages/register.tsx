import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { Button } from '@point/ui'
import { useTranslation } from 'react-i18next'

export default function Register() {
  const { t } = useTranslation();
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError(t('passwords_do_not_match_error'))
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: 'user',
      }, { withCredentials: true })
      
      const { access_token, user } = response.data
      
      Cookies.set('token', access_token, { expires: 7 })
      Cookies.set('user', JSON.stringify(user), { expires: 7 })
      
      router.push('/dashboard')

    } catch (err: any) {
      console.error('Frontend: Error during registration:', err);
      setError(err.response?.data?.message || t('registration_failed_error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>{t('register_page_title')}</title>
      </Head>
      
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl sm:text-4xl font-extrabold text-gray-900">
              {t('create_your_account_title')}
            </h2>
            <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
              Or{' '}
              <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                {t('signin_existing_account_link')}
              </Link>
              {' '}
              or{' '}
              <Link href="/" className="font-medium text-primary-600 hover:text-primary-500">
                {t('go_to_home_link')}
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  {t('username_label_no_colon')}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input mt-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('username_placeholder')}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('email_label')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input mt-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('email_placeholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('password_label')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input mt-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('password_placeholder')}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  {t('confirm_password_label')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input mt-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('confirm_password_placeholder')}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                loading={loading}
                className="w-full"
                variant="primary"
              >
                {t('create_account_button')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
