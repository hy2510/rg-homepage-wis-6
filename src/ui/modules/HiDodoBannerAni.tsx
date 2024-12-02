import Lottie from 'react-lottie'
import animationData from '../../../public/src/lottie/hidodo-banner.json'

export default function HiDodoBannerAni() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <>
      <Lottie options={defaultOptions} height={60} width={220} />
    </>
  )
}
