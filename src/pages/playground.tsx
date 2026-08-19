/* eslint-disable react/no-unescaped-entities */
import withTransition, { PageProps } from 'components/common/with-transition'
import useMenuChange from 'hooks/use-menu-change'
import { routes } from 'lib/utils'
import Footer from 'module/footer'
import SnakeGame from 'module/playground/snake-game'
import ThreeScene from 'module/playground/three-scene'
import React from 'react'

const Playground = ({ asPreview }: PageProps) => {
  const scopeComponentWhenMenuChange = useMenuChange({ asPreview })

  return (
    <div ref={scopeComponentWhenMenuChange} className="w-screen bg-primary">
      <div className="h-[10vh] w-full"></div>
      <div className="CONTAINER">
        <h1 className="MENU-CHANGE-SCALE-125 font-display text-6xl font-semibold text-secondary underline lg:text-8xl">Playground</h1>
        <p className="MENU-CHANGE-Y-100 mt-6 max-w-2xl font-poppins text-lg text-secondary/70 lg:text-xl">
          A place to play, experiment, and have fun — drag the 3D scene, beat the snake game, and don't forget the secret easter eggs... 🥚
        </p>
      </div>
      {!asPreview && (
        <>
          <section id="section-3d" className="CONTAINER mt-[15vh]">
            <h2 className="MENU-CHANGE-Y-100 font-poppins text-3xl font-medium text-secondary md:text-5xl">
              3D <span className="text-yellow-300">Playground</span>
            </h2>
            <div className="MENU-CHANGE-Y-200 mt-10">
              <ThreeScene />
            </div>
          </section>

          <section id="section-snake" className="CONTAINER mt-[20vh]">
            <h2 className="MENU-CHANGE-Y-100 font-poppins text-3xl font-medium text-secondary md:text-5xl">
              Snake <span className="text-yellow-300">Game</span>
            </h2>
            <div className="MENU-CHANGE-Y-200 mt-10">
              <SnakeGame />
            </div>
          </section>

          <section id="section-secrets" className="CONTAINER mt-[20vh]">
            <div className="rounded-2xl border border-dashed border-secondary/25 p-8 md:p-12">
              <h2 className="MENU-CHANGE-Y-100 font-poppins text-2xl font-medium text-secondary md:text-4xl">Psst... secrets 🥚</h2>
              <p className="MENU-CHANGE-Y-200 mt-4 font-poppins text-sm text-secondary/60 md:text-base">
                Try the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) anywhere on this site. Or type{' '}
                <code className="rounded bg-secondary/10 px-2 py-0.5 text-yellow-300">car</code> or{' '}
                <code className="rounded bg-secondary/10 px-2 py-0.5 text-yellow-300">rangga</code> while browsing... 🚗🚨
              </p>
            </div>
          </section>

          <div className="mt-[15vh]">
            <Footer linkTitle="HOME" linkTo={routes.index} title="Done playing?" />
          </div>
        </>
      )}
    </div>
  )
}

export default React.memo(Playground)
export const PlaygroundTransition = React.memo(withTransition(Playground))
