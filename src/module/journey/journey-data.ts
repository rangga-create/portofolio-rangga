import ClassImg from 'assets/images/class.png'
import CrealokaImg from 'assets/images/crealoka-summary.png'
import DicodingElitImg from 'assets/images/dicoding-elit-summary.png'
import DSC04903Img from 'assets/images/DSC04903.jpg'
import DSC05081Img from 'assets/images/DSC05081.jpg'
import GerakDampakImg from 'assets/images/gerakdampak.png'
import IDCampImg from 'assets/images/idcamp-summary.png'
import JapanImg from 'assets/images/japan.jpg'
import Japan2Img from 'assets/images/japan2.jpg'
import JrgImg from 'assets/images/jrg-summary.png'
import KurbanImg from 'assets/images/kurban.jpg'
import MakeFirstMoveImg from 'assets/images/make-firt-move.jpg'
import MonaproImg from 'assets/images/monapro-summary.png'
import PanggilinImg from 'assets/images/panggilin-summary.png'
import SatisfiedThumbsUp from 'assets/images/satisfied-thumbs-up.gif'

/* ------------------------------------------------------------------ */
/* 3D GLOBE "MY JOURNEY" — edit pins di sini (lat/lng kota kamu)       */
/* ------------------------------------------------------------------ */

export type JourneyPin = {
  city: string
  country: string
  lat: number
  lng: number
  emoji: string
  title: string
  text: string
  photos?: string[]
}

export const journeyPins: JourneyPin[] = [
  {
    city: 'Medan',
    country: 'Indonesia',
    lat: 3.5952,
    lng: 98.6722,
    emoji: '🌱',
    title: 'The Origin',
    // TODO: isi cerita Medan (masih placeholder)
    text: 'Awal mula perjalanan saya — dari kota ini semuanya dimulai.'
  },
  {
    city: 'Jakarta',
    country: 'Indonesia',
    lat: -6.2088,
    lng: 106.8456,
    emoji: '💼',
    title: 'The Workplace',
    // TODO: isi cerita Jakarta (masih placeholder)
    text: 'Tempat saya bekerja dan mengembangkan diri sebagai software developer.'
  },
  {
    city: 'Bandung',
    country: 'Indonesia',
    lat: -6.9175,
    lng: 107.6191,
    emoji: '🏆',
    title: 'The Community',
    text: 'Tempat saya mengikuti berbagai kegiatan organisasi, forum kepemudaan, kompetisi, dan program pengembangan diri yang membantu saya membangun kemampuan komunikasi, kepemimpinan, kerja sama, dan berpikir kritis di luar dunia coding.'
  },
  {
    city: 'Jonggol',
    country: 'Indonesia',
    lat: -6.4765,
    lng: 107.035,
    emoji: '🫶',
    title: 'The Origin',
    text: 'Tempat pendidikan dan awal perjalanan saya dalam dunia software development, organisasi, dan pengembangan diri.',
    photos: [KurbanImg, Japan2Img, JapanImg]
  },
  {
    city: 'Tangerang',
    country: 'Indonesia',
    lat: -6.1783,
    lng: 106.6319,
    emoji: '💻',
    title: 'The Developer',
    text: 'Tempat saya mengembangkan kemampuan sebagai software developer dan membangun berbagai project menggunakan teknologi web modern.'
  }
]

/* ------------------------------------------------------------------ */
/* CHOOSE YOUR ADVENTURE — edit cerita & foto di sini                  */
/* ------------------------------------------------------------------ */

export type AdventureScene = {
  title: string
  period: string
  role: string
  text: string
  image: string
  photos?: string[]
}

export type AdventurePath = {
  id: string
  icon: string
  title: string
  tagline: string
  color: string
  scenes: AdventureScene[]
}

export const adventurePaths: AdventurePath[] = [
  {
    id: 'developer',
    icon: '💻',
    title: 'The Developer Path',
    tagline: 'Building software, learning continuously, and turning ideas into working applications.',
    color: '#0091F8',
    scenes: [
      {
        title: 'Aplikasi Absen Shalat MadinatulQuran',
        period: '2021 - 2022',
        role: 'Full Stack Developer',
        text: 'Salah satu project awal saya dalam mengembangkan aplikasi web. Saya membangun sistem absensi shalat untuk membantu proses pencatatan, rekap harian, dan pengelolaan data secara lebih terstruktur di lingkungan MadinatulQuran.',
        // TODO: ganti foto placeholder (idcamp-summary) dengan foto asli Absen Shalat
        image: IDCampImg
      },
      {
        title: 'BookVibe',
        period: '2022 - 2024',
        role: 'Frontend Developer',
        text: 'Mengembangkan antarmuka platform rekomendasi dan ulasan buku digital. Project ini menjadi pengalaman saya dalam membangun UI yang interaktif dengan fitur rating, ulasan, dan koleksi buku pribadi.',
        // TODO: ganti foto placeholder (crealoka-summary) dengan foto asli BookVibe
        image: CrealokaImg
      },
      {
        title: 'Aplikasi Sosial Media',
        period: '2023 - 2024',
        role: 'Full Stack Developer',
        text: 'Mengembangkan platform media sosial dengan berbagai fitur seperti post, follow, komentar, dan notifikasi real-time. Project ini membantu saya memahami bagaimana frontend dan backend bekerja bersama untuk membangun aplikasi yang lebih kompleks.',
        // TODO: ganti foto placeholder (panggilin-summary) dengan foto asli Aplikasi Sosial Media
        image: PanggilinImg
      }
    ]
  },
  {
    id: 'builder',
    icon: '🚀',
    title: 'The Builder Path',
    tagline: 'Turning ideas into practical applications and exploring different areas of software development.',
    color: '#F85959',
    scenes: [
      {
        title: 'Bropal',
        period: '2023 - 2024',
        role: 'Backend Developer',
        text: 'Mengembangkan sisi backend aplikasi manajemen proyek kolaboratif dengan task tracking dan role-based access control. Project ini menjadi pengalaman saya dalam membangun REST API dan menangani kebutuhan backend sebuah aplikasi.',
        // TODO: ganti foto placeholder (jrg-summary) dengan foto asli Bropal
        image: JrgImg
      },
      {
        title: 'Sistem Koperasi Sekolah',
        period: 'Nov 2022 - Mar 2023',
        role: 'Full Stack Developer',
        text: 'Membangun sistem koperasi sekolah untuk membantu pengelolaan transaksi, inventaris, laporan keuangan, dan data anggota secara lebih terorganisir.',
        // TODO: ganti foto placeholder (monapro-summary) dengan foto asli Sistem Koperasi Sekolah
        image: MonaproImg
      },
      {
        title: 'Implementasi Machine Learning Web',
        period: '—',
        role: 'ML Integration Developer',
        text: 'Mengeksplorasi integrasi machine learning ke dalam aplikasi web untuk melakukan klasifikasi dan prediksi data. Project ini memperluas ketertarikan saya dari software development ke bidang Artificial Intelligence.',
        // TODO: isi periode & ganti foto placeholder (dicoding-elit) dengan foto asli ML Web
        image: DicodingElitImg
      }
    ]
  },
  {
    id: 'leadership',
    icon: '🎓',
    title: 'The Leadership & Community Path',
    tagline: 'Learning to lead, communicate, collaborate, and contribute beyond technology.',
    color: '#FFC436',
    scenes: [
      {
        title: 'Ketua OSIS',
        period: '2024 - 2025',
        role: 'Ketua OSIS — SMK MadinatulQuran',
        text: 'Menjadi Ketua OSIS mengajarkan saya bagaimana memimpin tim, mengatur program kerja, berkomunikasi dengan berbagai pihak, mengambil keputusan, dan bertanggung jawab terhadap organisasi.',
        // TODO: ganti foto placeholder (idcamp-summary) dengan foto asli OSIS
        image: IDCampImg
      },
      {
        title: 'Forum OSIS Jawa Barat',
        period: '2024',
        role: 'Peserta',
        text: 'Mengikuti Forum OSIS Jawa Barat sebagai kesempatan untuk bertemu dengan siswa dari berbagai daerah, bertukar pengalaman organisasi, memperluas relasi, serta belajar mengenai kepemimpinan dan kolaborasi.',
        // TODO: ganti foto placeholder (dicoding-elit) dengan foto asli Forum OSIS Jawa Barat
        image: DicodingElitImg
      },
      {
        title: '1M Youth Stop Bullying',
        period: '2024',
        role: 'Relawan',
        text: 'Berpartisipasi sebagai relawan dalam gerakan 1M Youth Stop Bullying. Pengalaman ini memperkuat kepedulian saya terhadap lingkungan sosial dan pentingnya membangun lingkungan yang aman dan saling menghargai.',
        image: GerakDampakImg
      }
    ]
  },
  {
    id: 'global',
    icon: '🌍',
    title: 'The Global Perspective',
    tagline: 'Developing confidence, communication, and a broader perspective through international activities.',
    color: '#9EB384',
    scenes: [
      {
        title: 'Class2Class International Discussion',
        period: '2024 - Present',
        role: 'Delegasi',
        text: 'Mengikuti Class2Class International Discussion sebagai delegasi dalam kegiatan diskusi lintas negara. Pengalaman ini membantu saya meningkatkan kemampuan komunikasi, public speaking, bertukar perspektif, dan memahami sudut pandang dari lingkungan yang berbeda.',
        image: ClassImg
      },
      {
        title: 'Mini MUN',
        period: '2023',
        role: 'Peserta',
        text: 'Mengikuti Mini Model United Nations untuk mengenal simulasi sidang internasional sekaligus melatih kemampuan berbicara, menyampaikan argumentasi, berdiskusi, dan memahami isu-isu global.',
        image: DSC05081Img
      },
      {
        title: 'Model United Nations (MUN)',
        period: '2023',
        role: 'Delegasi',
        text: 'Berpartisipasi sebagai delegasi dalam Model United Nations. Kegiatan ini memberikan pengalaman dalam riset isu, public speaking, negosiasi, diplomasi, dan menyampaikan pendapat secara terstruktur.',
        image: DSC04903Img
      }
    ]
  },
  {
    id: 'origin',
    icon: '🌱',
    title: 'The Origin Path',
    tagline: 'Before the job titles — where the journey actually began.',
    color: '#F1592A',
    scenes: [
      {
        title: 'The First Move',
        period: 'SMK MadinatulQuran Jonggol',
        role: 'Rekayasa Perangkat Lunak (RPL)',
        text: 'Jonggol, Indonesia. A laptop, an IDE, and a decision to make the first move — from student to builder. Di sinilah saya mulai belajar software development, organisasi, dan pengembangan diri.',
        image: MakeFirstMoveImg
      },
      {
        title: 'Still Curious',
        period: 'Now',
        role: 'Keep Learning',
        text: "The mission statement hasn't changed: build things people love, and never stop learning.",
        image: SatisfiedThumbsUp
      }
    ]
  }
]
