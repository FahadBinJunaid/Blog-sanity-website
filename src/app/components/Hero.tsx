'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Contact Us', href: '#' },
]

export default function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <header className="relative inset-x-0 top-0 z-50 shadow-lg">
                <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-12">
                    <div className="flex lg:flex-1">
                        <h1 className='text-3xl font-bold'>MyBlog</h1>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-lg font-medium hover:underline">
                                {item.name}
                            </a>
                        ))}
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">MyBlog</h1>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-200">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-gray-900 hover:bg-gray-100"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <div className="relative isolate px-6 pt-20 lg:px-16">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(50% 0%, 100% 0%, 100% 50%, 50% 100%, 0% 50%, 0% 0%)',
                        }}
                        className="relative left-1/2 w-[30rem] -translate-x-1/2 bg-gradient-to-tr from-pink-300 to-indigo-500 opacity-50 sm:w-[60rem]"
                    />
                </div>
                <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            Discover a New World of Blogging
                        </h1>
                        <p className="mt-6 text-lg font-light sm:text-xl">
                            Join us to explore the best tips, stories, and insights every week.
                        </p>
                        <button className="mt-8 rounded-full bg-white px-6 py-3 text-lg font-semibold text-purple-600 hover:bg-gray-200">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}