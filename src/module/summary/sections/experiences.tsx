import React from 'react'
import TitleSummaries from '../title-summaries'
import PattrickImg from 'assets/images/pattrick.gif'
import { motion } from 'framer-motion'
import Experience from '../experience'
import WithCursorElement from 'components/common/with-cursor-element'

const Experiences = () => {
  return (
    <div className="CONTAINER MENU-CHANGE-Y-100-STAGGER relative mt-[10vh] grid grid-cols-1 gap-16 lg:grid-cols-2">
      <div className="CHILD-STAGGER" id="education">
        <TitleSummaries text="Education" observeId="education" />
        <ul className="list-disc marker:text-white">
          <Experience
            notAllowed
            title="SMK MadinatulQuran Jonggol"
            sentences={['Rekayasa Perangkat Lunak (RPL)', '2024 - 2027', 'Rata-rata Nilai: 90']}
            link="/"
          />
        </ul>
      </div>
      <div className="CHILD-STAGGER" id="experiences">
        <TitleSummaries text="Experiences" observeId="experiences" />
        <ul className="list-disc marker:text-white">
          <Experience notAllowed title="Aplikasi Absen Shalat MadinatulQuran" sentences={['Fullstack Developer', 'Dec 2024 - Present']} link="/" />
          <Experience notAllowed title="BookVibe" sentences={['Fullstack Developer', 'Mar 2022 - Nov 2024']} link="/" className="mt-5" />
          <Experience notAllowed title="Aplikasi Sosial Media" sentences={['Frontend Developer', 'Jun 2021 - Mar 2022']} link="/" className="mt-5" />
        </ul>
      </div>
      <div className="CHILD-STAGGER" id="selected-project">
        <TitleSummaries text="Selected Projects" observeId="selected-project" />
        <ul className="list-disc marker:text-white">
          <Experience notAllowed title="Bropal" sentences={['Fullstack', 'Okt 2022 - Apr 2023', 'Contract']} link="/" />
          <Experience
            notAllowed
            title="Sistem Koperasi Sekolah - Telkom"
            sentences={['Frontend', 'Nov 2022 - Mar 2023', 'Contract']}
            link="/"
            className="mt-5"
          />
        </ul>
      </div>
      <div className="CHILD-STAGGER" id="selected-activities">
        <TitleSummaries text="Organization" observeId="selected-activities" />
        <ul className="list-disc marker:text-white">
          <Experience notAllowed title="Ketua OSIS — SMK MadinatulQuran" sentences={['2024 - 2025']} link="/" />
          <Experience notAllowed title="Forum OSIS Jawa Barat" sentences={['Peserta', '2024']} link="/" className="mt-5" />
          <Experience notAllowed title="1M Youth Stop Bullying" sentences={['Relawan', '2024']} link="/" className="mt-5" />
          <Experience notAllowed title="Class2Class International Discussion" sentences={['Delegasi', '2024']} link="/" className="mt-5" />
          <Experience notAllowed title="Mini MUN" sentences={['Peserta', '2023']} link="/" className="mt-5" />
          <Experience notAllowed title="Model United Nations (MUN)" sentences={['Delegasi', '2023']} link="/" className="mt-5" />
        </ul>
      </div>
      <div className="CHILD-STAGGER" id="selected-certificate">
        <TitleSummaries text="Selected Certificate" observeId="selected-certificate" />
        <ul className="list-disc marker:text-white">
          <Experience
            title="React Developer Expert"
            sentences={['Dicoding Indonesia', '2023 - 2026']}
            link="https://www.dicoding.com/certificates/72ZD9MRQ9PYW"
          />
          <Experience
            title="Frontend Developer Expert"
            sentences={['Dicoding Indonesia', '2022 - 2025']}
            link="https://www.dicoding.com/certificates/2VX3YNL0JPYQ"
            className="mt-5"
          />
        </ul>
      </div>
      <div className="CHILD-STAGGER" id="tech">
        <TitleSummaries text="Tech" observeId="tech" />
        <p className="font-poppins text-base text-secondary lg:text-2xl">
          ReactJS . NextJS . NestJS . NodeJS . GO . Fiber . Microservices . Microfrontend . Typescript . Javascript . AWS . PostgreSQL
          <WithCursorElement
            state={{
              element: {
                element: (
                  <motion.img
                    src={PattrickImg}
                    alt="getting dizzy"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.7 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-[300px]"
                  />
                ),
                key: 'dizzy',
                type: 'hover'
              }
            }}
          >
            <span className="ml-2 text-yellow-100">And Keep Learning...</span>
          </WithCursorElement>
        </p>
      </div>
      <div className="CHILD-STAGGER" id="contact">
        <TitleSummaries text="Contact" observeId="contact" />
        <ul className="list-disc marker:text-white">
          <Experience title="Email" sentences={['ranggasaputraaaa453@gmail.com']} link="mailto:ranggasaputraaaa453@gmail.com" />
          <Experience title="Linkedin" sentences={['Rangga Saputra']} link="https://www.linkedin.com/in/rangga" className="mt-5" />
        </ul>
      </div>
    </div>
  )
}

export default React.memo(Experiences)
