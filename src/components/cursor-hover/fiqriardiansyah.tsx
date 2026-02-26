import RoundedText from 'components/effect/rounded-text'
import { motion } from 'framer-motion'

const RanggaSaputraHover = () => {
  return (
    <motion.div animate={{ scale: 1, opacity: 1 }} initial={{ scale: 0.3, opacity: 0 }} exit={{ scale: 0.3, opacity: 0 }}>
      <RoundedText
        text="Rangga Saputra"
        className="border-2 border-solid border-white"
        textClassName="font-display !text-white font-semibold capitalize"
        size={60}
        space={20}
      >
        <div className="boder-solid h-[55%] w-[55%] rounded-full border-2 border-white backdrop-invert" />
      </RoundedText>
    </motion.div>
  )
}

RanggaSaputraHover.key = 'ranggasaputra'
RanggaSaputraHover.type = 'hover'

export default RanggaSaputraHover
