/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion'
import StaggerElementFooter from 'module/footer/stagger-element'
import React from 'react'

const Description = () => {
  const [hover, setHover] = React.useState(false)

  return (
    <div className="CONTAINER min-h-screen">
      <h1 className="MENU-CHANGE-SCALE-125 font-display text-6xl font-semibold text-secondary underline lg:text-8xl">Summary</h1>
      <div className="h-[20vh]"></div>
      <div className="flex flex-col">
        <h2 className=" MENU-CHANGE-Y-100 font-poppins text-6xl font-semibold text-white lg:text-9xl">Rangga Saputra</h2>
        <p className="MENU-CHANGE-Y-100 mt-4 font-poppins text-2xl text-secondary lg:text-3xl">
          Saya adalah web developer yang fokus di React dan TailwindCSS
        </p>
        <p className="MENU-CHANGE-Y-200 mt-10 text-justify font-poppins text-lg text-secondary lg:text-left lg:text-xl">
          <span className="font-semibold text-white">Halo! 👋</span> Selamat datang di profil saya. Saya adalah web developer yang fokus di React dan TailwindCSS untuk membuat antarmuka pengguna yang indah dan responsif.
          <br />
          <br />
          Mari kita buat sesuatu yang luar biasa dengan kode! 🎉🎉🎉
        </p>
        <a href="/rangga_saputra_cv.pdf" target="_blank" download title="download cv" className="MENU-CHANGE-Y-200 mt-10 w-fit" rel="noreferrer">
          <motion.div
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            className="relative rounded border border-white px-5 py-2 font-poppins capitalize text-white"
          >
            <span className="text-xl opacity-0">download cv</span>
            <StaggerElementFooter
              aria-hidden
              to="0"
              triger={hover}
              from="-130%"
              perLetter
              tag="h2"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-xl font-medium leading-[1.3] text-white"
            >
              Download CV
            </StaggerElementFooter>
            <StaggerElementFooter
              aria-hidden
              to="130%"
              from="0"
              triger={hover}
              perLetter
              tag="h2"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-xl font-medium leading-[1.3] text-white"
            >
              Download CV
            </StaggerElementFooter>
          </motion.div>
        </a>
      </div>
    </div>
  )
}

export default React.memo(Description)
