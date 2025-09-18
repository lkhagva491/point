import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Point - Welcome</title>
        <meta name="description" content="Welcome to Point - Your modern web application" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">Point</h1>
              <nav className="flex space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main>
          <div className="hero-gradient">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                  Welcome to Point
                </h2>
                <p className="mt-3 max-w-md mx-auto text-base text-primary-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  A modern, scalable web application built with NextJS, NestJS, and MongoDB.
                  Experience the power of full-stack development.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link href="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                      Get started
                    </Link>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link href="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10">
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Everything you need to get started
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Built with modern technologies and best practices for optimal performance and developer experience.
                </p>
              </div>

              <div className="mt-10">
                <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                  <div className="relative">
                    <div className="card">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Modern Stack</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Built with NextJS, NestJS, MongoDB, and TypeScript for a robust and scalable application.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="card">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Authentication</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Secure JWT-based authentication with role-based access control for admin and user interfaces.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="card">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Responsive Design</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Beautiful, responsive UI built with Tailwind CSS that works perfectly on all devices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400">
                © 2024 Point. Built with ❤️ using modern web technologies.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
