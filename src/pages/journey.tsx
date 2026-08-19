/* eslint-disable react/no-unescaped-entities */
import withTransition, { PageProps } from 'components/common/with-transition'
import useMenuChange from 'hooks/use-menu-change'
import { routes } from 'lib/utils'
import Adventure from 'module/journey/adventure'
import GlobeScene from 'module/journey/globe-scene'
import Footer from 'module/footer'
import React from 'react'

const Journey = ({ asPreview }: PageProps) => {
  const scopeComponentWhenMenuChange = useMenuChange({ asPreview })

  return (
    <div ref={scopeComponentWhenMenuChange} className="w-screen bg-primary">
      <div className="h-[10vh] w-full"></div>
      <div className="CONTAINER">
        <h1 className="MENU-CHANGE-SCALE-125 font-display text-6xl font-semibold text-secondary underline lg:text-8xl">Journey</h1>
        <p className="MENU-CHANGE-Y-100 mt-6 max-w-2xl font-poppins text-lg text-secondary/70 lg:text-xl">
          Not just a list of jobs — a story. Spin the globe to see where it happened, then choose a path and live through it. 🗺️
        </p>
      </div>
      {!asPreview && (
        <>
          <section id="section-globe" className="CONTAINER mt-[15vh]">
            <h2 className="MENU-CHANGE-Y-100 font-poppins text-3xl font-medium text-secondary md:text-5xl">
              My Journey <span className="text-yellow-300">Globe</span>
            </h2>
            <p className="MENU-CHANGE-Y-100 mt-4 font-poppins text-sm text-secondary/60 md:text-base">
              Click a glowing pin to read the story behind that place. 🌍
            </p>
            <div className="MENU-CHANGE-Y-200 mt-10">
              <GlobeScene />
            </div>
          </section>

          <section id="section-adventure" className="CONTAINER mt-[20vh]">
            <h2 className="MENU-CHANGE-Y-100 font-poppins text-3xl font-medium text-secondary md:text-5xl">
              Choose Your <span className="text-yellow-300">Adventure</span>
            </h2>
            <div className="MENU-CHANGE-Y-200 mt-10">
              <Adventure />
            </div>
          </section>

          <div className="mt-[15vh]">
            <Footer linkTitle="PLAYGROUND" linkTo={routes.playground} title="Ready to play?" />
          </div>
        </>
      )}
    </div>
  )
}

export default React.memo(Journey)
export const JourneyTransition = React.memo(withTransition(Journey))
