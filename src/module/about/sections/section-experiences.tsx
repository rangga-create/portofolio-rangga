import BroPayImg from 'assets/images/BroPay.png'
import BuangYukImg from 'assets/images/buangYuk.png'
import BDDImg from 'assets/images/bdd-summary.png'
import ClassImg from 'assets/images/class.png'
import CrealokaImg from 'assets/images/crealoka-summary.png'
import DicodingElitImg from 'assets/images/dicoding-elit-summary.png'
import DSC05081Img from 'assets/images/DSC05081.jpg'
import GerakDampakImg from 'assets/images/gerakdampak.png'
import IDCampImg from 'assets/images/idcamp-summary.png'
import IncitImg from 'assets/images/incit-summary.png'
import JrgImg from 'assets/images/jrg-summary.png'
import MonaproImg from 'assets/images/monapro-summary.png'
import PanggilinImg from 'assets/images/panggilin-summary.png'
import Magnet from 'components/effect/magnet'
import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import ExperienceRow, { ExperienceRowProps } from 'module/about/experience-row'
import LetterSpacingTitle from 'module/about/letter-spacing-title'
import { AiOutlineArrowDown } from 'react-icons/ai'

export default function SectionExperiences() {
  const experiences: ExperienceRowProps[] = [
    {
      text1: 'INCIT',
      text2: '2024 - Present',
      text3: 'Fullstack Developer',
      color: 'rgba(158,107,184,0.996078)',
      image: IncitImg,
      link: 'https://incit.org'
    },
    // TODO: ganti foto placeholder (crealoka-summary) dengan foto asli BookVibe
    { text1: 'BookVibe', text2: '2022 - 2024', text3: 'Fullstack Developer', color: '#0091F8', image: CrealokaImg },
    // TODO: ganti foto placeholder (idcamp-summary) dengan foto asli Aplikasi Absen Shalat
    { text1: 'Aplikasi Absen Shalat MadinatulQuran', text2: '2021 - 2022', text3: 'Frontend Developer', color: '#F1592A', image: IDCampImg },
    // TODO: ganti foto placeholder (panggilin-summary) dengan foto asli Lentera Sosmed
    { text1: 'Lentera Sosmed', text2: '2023 - 2024', text3: 'Frontend Developer', color: '#F85959', image: PanggilinImg },
    {
      text1: 'Bro Pay',
      text2: '2023 - 2024',
      text3: 'Frontend Developer',
      color: '#411719',
      image: BroPayImg,
      link: 'https://vibe-coding-hoo6.vercel.app/dashboard'
    },
    // TODO: ganti foto placeholder (monapro-summary) dengan foto asli Pokemon
    { text1: 'Pokemon', text2: '2023 - 2024', text3: 'Frontend Developer & Backend', color: '#9EB384', image: MonaproImg },
    {
      text1: 'buangYuk',
      text2: '2024 - 2025',
      text3: 'Frontend Developer',
      color: '#FFC436',
      image: BuangYukImg,
      link: 'https://buang-y-uk.vercel.app/'
    }
  ]

  const selectedProjects: ExperienceRowProps[] = [
    { text1: 'JRG Bus', text2: 'Contract', text3: 'Fullstack Developer', color: '#F85959', image: JrgImg },
    // TODO: ganti foto placeholder (crealoka-summary) dengan foto asli BookVibe
    { text1: 'BookVibe', text2: '2022 - 2024', text3: 'Fullstack Developer', color: '#0091F8', image: CrealokaImg },
    // TODO: ganti foto placeholder (idcamp-summary) dengan foto asli Aplikasi Absen Shalat
    { text1: 'Aplikasi Absen Shalat MadinatulQuran', text2: '2021 - 2022', text3: 'Frontend Developer', color: '#F1592A', image: IDCampImg },
    // TODO: ganti foto placeholder (panggilin-summary) dengan foto asli Lentera Sosmed
    { text1: 'Lentera Sosmed', text2: '2023 - 2024', text3: 'Frontend Developer', color: '#F85959', image: PanggilinImg },
    {
      text1: 'Bro Pay',
      text2: '2023 - 2024',
      text3: 'Frontend Developer',
      color: '#411719',
      image: BroPayImg,
      link: 'https://vibe-coding-hoo6.vercel.app/dashboard'
    },
    // TODO: ganti foto placeholder (monapro-summary) dengan foto asli Pokemon
    { text1: 'Pokemon', text2: '2023 - 2024', text3: 'Frontend Developer & Backend', color: '#9EB384', image: MonaproImg },
    {
      text1: 'buangYuk',
      text2: '2024 - 2025',
      text3: 'Frontend Developer',
      color: '#FFC436',
      image: BuangYukImg,
      link: 'https://buang-y-uk.vercel.app/'
    }
  ]

  const actvities: ExperienceRowProps[] = [
    { text1: 'Dicoding Elite', text2: 'Present', text3: 'Code Reviewer', image: DicodingElitImg },
    { text1: 'BDD Event', text2: '2021/2023', text3: 'Facilitator', image: BDDImg },
    // TODO: ganti foto placeholder (idcamp-summary) dengan foto asli Forum OSIS Jawa Barat
    { text1: 'Forum OSIS Jawa Barat', text2: '2024', text3: 'Peserta', image: IDCampImg },
    { text1: '1M Youth Stop Bullying', text2: '2023 - 2024', text3: 'Relawan', image: GerakDampakImg },
    { text1: 'Class2Class International Discussion', text2: '2024 - sekarang', text3: 'Delegasi', image: ClassImg },
    { text1: 'Mini MUN', text2: '2023', text3: 'Delegasi', image: DSC05081Img },
    { text1: 'Model United Nations (MUN)', text2: '2024 - 2025', text3: 'Delegasi', image: DSC05081Img }
  ]

  return (
    <section id="section-experiences-about" className="CONTAINER">
      <Magnet strength={10} className="z-[-10] mt-4 w-fit">
        <motion.div
          animate={{ width: '100px' }}
          initial={{ width: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 1, ease: easeDefault }}
          className="MENU-CHANGE-OPACITY-0 flex h-[100px] items-center justify-center bg-yellow-300"
        >
          <Magnet>
            <AiOutlineArrowDown className="text-8xl" />
          </Magnet>
        </motion.div>
      </Magnet>
      <LetterSpacingTitle>Experiences</LetterSpacingTitle>
      <div className="MENU-CHANGE-Y-100-STAGGER">
        {experiences.map((exp, i) => (
          <ExperienceRow {...exp} key={i} />
        ))}
      </div>
      <div className="h-[10vh] md:h-[15vh] lg:h-[30vh]"></div>
      <Magnet strength={10} className="z-[-10] mt-4 w-fit">
        <motion.div
          animate={{ width: '100px' }}
          initial={{ width: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 1, ease: easeDefault }}
          className="flex h-[100px] items-center justify-center bg-yellow-300"
        >
          <Magnet>
            <AiOutlineArrowDown className="text-8xl" />
          </Magnet>
        </motion.div>
      </Magnet>
      <LetterSpacingTitle>Selected Projects</LetterSpacingTitle>
      <div className="MENU-CHANGE-Y-100-STAGGER">
        {selectedProjects.map((exp, i) => (
          <ExperienceRow {...exp} key={i} />
        ))}
      </div>
      <div className="h-[10vh] md:h-[15vh] lg:h-[30vh]"></div>
      <Magnet strength={10} className="z-[-10] mt-4 w-fit">
        <motion.div
          animate={{ width: '100px' }}
          initial={{ width: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 1, ease: easeDefault }}
          className="flex h-[100px] items-center justify-center bg-yellow-300"
        >
          <Magnet>
            <AiOutlineArrowDown className="text-8xl" />
          </Magnet>
        </motion.div>
      </Magnet>
      <LetterSpacingTitle>Selected Activities</LetterSpacingTitle>
      <div className="MENU-CHANGE-Y-100-STAGGER">
        {actvities.map((exp, i) => (
          <ExperienceRow {...exp} key={i} />
        ))}
      </div>
    </section>
  )
}
