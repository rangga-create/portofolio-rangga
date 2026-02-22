import { StateContext } from 'context/state'
import { AnimatePresence, motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import React from 'react'
import { LiaExternalLinkAltSolid } from 'react-icons/lia'
import { TfiClose } from 'react-icons/tfi'

export default function UpCommingAlert() {
  const { state, setState } = React.useContext(StateContext)

  const onClose = () => {
    if (setState)
      setState((prev) => ({
        ...prev,
        showNotif: false
      }))
  }
  return (
    <AnimatePresence>
      {state?.showNotif ? (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.7, ease: easeDefault }}
          className="fixed inset-x-5 bottom-5 z-[99] rounded-lg bg-white p-5 shadow-2xl md:left-auto"
        >
          <div className="mb-10 flex items-center justify-between">
            <h1 className="m-0 mr-10 font-spartan text-xl font-semibold">Try my new project 📝</h1>
            <button onClick={onClose}>
              <TfiClose size={14} className="text-xl font-semibold" />
            </button>
          </div>
          <a href="https://notespacehub.com" target="_blank" rel="noopener noreferrer">
            <img className="h-[50px]" src="https://ik.imagekit.io/p4ukigs1hrvx/notspacehub-no-bg.png?updatedAt=1730190333568" alt="" />
            <label htmlFor="" className=" mt-2 flex cursor-pointer items-center gap-2 text-sm">
              https://notespacehub.com
              <LiaExternalLinkAltSolid />
            </label>
          </a>
        </motion.div>
      ) : // <motion.div
      //   initial={{ y: 50, opacity: 0 }}
      //   animate={{ y: 0, opacity: 1 }}
      //   exit={{ y: 50, opacity: 0 }}
      //   transition={{ duration: 0.7, ease: easeDefault }}
      //   className="fixed inset-x-5 bottom-5 z-[99] rounded-lg bg-white p-5 shadow-2xl md:left-auto"
      // >
      //   <div className="mb-10 flex items-center justify-between">
      //     <h1 className="m-0 font-spartan text-3xl font-semibold">Upcomming feature 📢</h1>
      //     <button onClick={onClose}>
      //       <TfiClose className="text-xl font-semibold" />
      //     </button>
      //   </div>
      //   <p className="font-poppins text-sm text-primary">
      //     <span className="mr-2 inline-block h-3 w-3 bg-primary"></span>
      //     <span className="text-lg">PWA ability</span> (might use your browser cookies for better performance)
      //   </p>
      //   <p className="font-poppins text-sm text-primary">
      //     <span className="mr-2 inline-block h-3 w-3 bg-primary"></span>
      //     <span className="text-lg">Language</span> (indonesia and english)
      //   </p>
      //   <p className="font-poppins text-sm text-primary">
      //     <span className="mr-2 inline-block h-3 w-3 bg-primary"></span>
      //     <span className="text-lg">New Page</span> (for each experiences detail)
      //   </p>
      //   <p className="font-poppins text-sm text-primary">
      //     <span className="mr-2 inline-block h-3 w-3 bg-primary"></span>
      //     <span className="text-lg">And any other feature...</span>
      //   </p>
      //   <Lottie
      //     options={{ ...defaultOptions, animationData: CarAnim }}
      //     height={100}
      //     width={100}
      //     isClickToPauseDisabled
      //     style={{ cursor: 'default' }}
      //   />
      // </motion.div>
      null}
    </AnimatePresence>
  )
}
