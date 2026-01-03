'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Settings, Shield } from 'lucide-react'
import { Button } from './ui/button'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000)
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent)
        setPreferences(saved)
      } catch (e) {
        console.error('Error loading cookie preferences:', e)
      }
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs))
    setPreferences(prefs)
    setShowBanner(false)
    setShowSettings(false)
    
    // Apply the preferences (integrate with your analytics/marketing tools)
    applyPreferences(prefs)
  }

  const applyPreferences = (prefs: CookiePreferences) => {
    // Analytics cookies (Google Analytics, etc.)
    if (prefs.analytics && typeof window !== 'undefined') {
      // Enable Google Analytics or other analytics tools
      console.log('Analytics cookies enabled')
      // Example: window.gtag('consent', 'update', { analytics_storage: 'granted' })
    } else {
      console.log('Analytics cookies disabled')
      // Example: window.gtag('consent', 'update', { analytics_storage: 'denied' })
    }

    // Marketing cookies (Facebook Pixel, Google Ads, etc.)
    if (prefs.marketing && typeof window !== 'undefined') {
      console.log('Marketing cookies enabled')
      // Example: window.gtag('consent', 'update', { ad_storage: 'granted' })
    } else {
      console.log('Marketing cookies disabled')
      // Example: window.gtag('consent', 'update', { ad_storage: 'denied' })
    }

    // Preference cookies
    if (prefs.preferences && typeof window !== 'undefined') {
      console.log('Preference cookies enabled')
    } else {
      console.log('Preference cookies disabled')
    }
  }

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    savePreferences(allAccepted)
  }

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    savePreferences(necessaryOnly)
  }

  const saveCustom = () => {
    savePreferences(preferences)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We value your privacy
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            {!showSettings ? (
              <>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                  You can manage your preferences or learn more in our{' '}
                  <a 
                    href="/cookie-policy" 
                    className="text-blue-700 dark:text-blue-300 hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cookie Policy
                  </a>
                  .
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={acceptAll}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={acceptNecessary}
                    variant="outline"
                    className="flex-1"
                  >
                    Necessary Only
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Customize
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Cookie Settings */}
                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            Necessary Cookies
                          </h4>
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                            Always Active
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Essential for the website to function properly. These cookies enable basic 
                          functionality like page navigation and access to secure areas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Analytics Cookies
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Help us understand how visitors interact with our website by collecting 
                          and reporting information anonymously.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Marketing Cookies
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Used to track visitors across websites to display relevant ads and 
                          marketing campaigns.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Preference Cookies */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Preference Cookies
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Remember your preferences and settings like language, region, and 
                          display options.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.preferences}
                          onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Settings Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={saveCustom}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Preferences
                  </Button>
                  <Button
                    onClick={() => setShowSettings(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 backdrop-blur-sm animate-in fade-in duration-300" />
    </>
  )
}
