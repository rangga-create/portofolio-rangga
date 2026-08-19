import CinematicIntro from 'components/common/cinematic-intro'
import Cursor from 'components/common/cursor'
import EasterEgg from 'components/common/easter-egg'
import Introduction from 'components/common/introduction'
import UpCommingAlert from 'components/common/upcomming-alert'
import Menu from 'components/navigation/menu'
import TopNav from 'components/navigation/top-nav'
import CursorProvider from 'context/cursor'
import StateProvider, { StateContext } from 'context/state'
import { AnimatePresence, motion } from 'framer-motion'
import { easeDefault, routes } from 'lib/utils'
import { AboutTransition } from 'pages/about'
import { HomeTransition } from 'pages/home'
import { JourneyTransition } from 'pages/journey'
import { PlaygroundTransition } from 'pages/playground'
import { SummaryTransition } from 'pages/summary'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

const Page = () => {
  const location = useLocation()
  const { state } = useContext(StateContext)
  const containerPageRef = useRef<any>()
  const [cinematicShow, setCinematicShow] = useState(false)

  const removeStyleContainer = () => {
    setTimeout(() => {
      if (containerPageRef.current) {
        containerPageRef.current.style.transform = 'inherit'
      }
    }, 500)
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000)
  }, [location.pathname])

  useEffect(() => {
    removeStyleContainer()
  }, [state?.isSplashShow, state?.menuShow, location.pathname])

  useEffect(() => {
    if (state?.isSplashShow === false) {
      const t = setTimeout(() => {
        if (!sessionStorage.getItem('cinematic-shown')) {
          sessionStorage.setItem('cinematic-shown', '1')
          setCinematicShow(true)
        }
      }, 800)
      return () => clearTimeout(t)
    }
  }, [state?.isSplashShow])

  if (state?.isSmallDevice === undefined) {
    return <div className="h-screen w-screen bg-primary"></div>
  }

  return (
    <>
      <AnimatePresence mode="sync">
        {state?.isSplashShow && (
          <motion.div
            layout
            key="introduction"
            exit={{ y: '-100vh', borderRadius: '100px' }}
            transition={{ duration: 1, ease: easeDefault }}
            className="self-center"
          >
            <Introduction />
          </motion.div>
        )}
      </AnimatePresence>
      {!state?.isSplashShow && (
        <>
          {cinematicShow && <CinematicIntro onFinish={() => setCinematicShow(false)} />}
          <AnimatePresence mode="wait">
            <React.Fragment key={location.pathname}>
              <TopNav />
              <Routes location={location} key={location.pathname}>
                <Route index element={<HomeTransition />} />
                <Route path={routes.about} element={<AboutTransition />} />
                <Route path={routes.summary} element={<SummaryTransition />} />
                <Route path={routes.playground} element={<PlaygroundTransition />} />
                <Route path={routes.journey} element={<JourneyTransition />} />
              </Routes>
            </React.Fragment>
          </AnimatePresence>
        </>
      )}
    </>
  )
}

const App = () => {
  return (
    <>
      <StateProvider>
        <CursorProvider>
          <UpCommingAlert />
          <Cursor />
          <Menu />
          <EasterEgg />
          <Page />
        </CursorProvider>
      </StateProvider>
    </>
  )
}

export default App
