import AestetikImg from 'assets/images/aestetik.png'
import SatisfiedImg from 'assets/images/satisfied-thumbs-up.gif'
import FunctionalImg from 'assets/images/start-stop-engine.png'
import WithCursorElement from 'components/common/with-cursor-element'
import { motion } from 'framer-motion'

const functionalityCursor = {
  element: (
    <motion.img
      animate={{ opacity: 0.7, scale: 1 }}
      initial={{ opacity: 0, scale: 0.2 }}
      exit={{ opacity: 0, scale: 0.2 }}
      src={FunctionalImg}
      className="w-[200px] object-cover"
    />
  ),
  key: 'functionality',
  type: 'hover'
}
const aetheticsCursor = {
  element: (
    <motion.img
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.2 }}
      exit={{ opacity: 0, scale: 0.2 }}
      src={AestetikImg}
      className="w-[200px] object-cover"
    />
  ),
  key: 'aesthetics',
  type: 'hover'
}
const satisfiedCursor = {
  element: (
    <motion.img
      animate={{ opacity: 0.7, scale: 1 }}
      initial={{ opacity: 0, scale: 0.2 }}
      exit={{ opacity: 0, scale: 0.2 }}
      src={SatisfiedImg}
      className="w-[200px] object-cover"
    />
  ),
  key: 'satisfied',
  type: 'hover'
}

export default function SectionFrontendDev() {
  return (
    <section className="relative z-[1000] min-h-[100vh] w-full bg-secondary pt-10">
      <div className="CONTAINER flex h-screen items-center ">
        <p className="MENU-CHANGE-Y-200 font-spartan text-6xl font-light xl:text-8xl 2xl:text-8xl 2xl:leading-loose">
          <WithCursorElement state={{ element: functionalityCursor as any }}>Functionality</WithCursorElement> +{' '}
          <WithCursorElement state={{ element: aetheticsCursor as any }}>Aesthetics</WithCursorElement> =
          <WithCursorElement state={{ element: satisfiedCursor as any }}>Satisfaction</WithCursorElement>
        </p>
      </div>
    </section>
  )
}
