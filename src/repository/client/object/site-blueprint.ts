import SITE_PATH, { CUSTOMER_CENTER_URL } from '@/app/site-path'
import { Customer } from './customer'

export interface SiteBlueprint {
  target: {
    private: boolean
    school: boolean
    academy: boolean
  }
  country: {
    korea: boolean
    vietnam: boolean
    indonesia: boolean
  }
  studyOpen: {
    EB: boolean
    PB: boolean
    LC: boolean
    MS: boolean
    PD: boolean
    JN: boolean
    ES: boolean
    PreK: boolean
    DodoABC: boolean
    Speak: boolean
  }
  studentOpen: {
    changeUserName: boolean
    nameMaxLangth: number
    userEmail: boolean
    phoneNumber: boolean
    reportSetting: boolean
    suspendSetting: boolean
    withdraw: boolean
  }
  main: {
    isHidodoBanner: boolean
    isSotialRgPost: boolean
  }
  isStudentNoLogin: boolean
  isChallengeMenu: boolean
  isNewsLetter: boolean
  isSnsMenuOpen: boolean
  isShowLevelMasterRanking: boolean
  isOnStudySetting: boolean
  isShowStudyEndInform: boolean
  isPaymentable: boolean
  paymentUrl: string
  isShowStudyEndDay: boolean
  customerCenterUrl: string
  customLogo?: string
  isFirstPreK: boolean
}

export function makeSiteBlueprint(customer: Customer): SiteBlueprint {
  const {
    customerUse,
    countryCode,
    useStudentNoYn,
    studyEBUseYn,
    studyPBUseYn,
    studyLCUseYn,
    studyMSUseYn,
    studyPDUseYn,
    studyJNUseYn,
    studyESUseYn,
    useSpeakYn,
    needPayment,
    preKMode,
  } = customer

  const type = customerUse.toLocaleLowerCase() as
    | 'academy'
    | 'school'
    | 'private'

  const target = {
    private: type === 'private',
    school: type === 'school',
    academy: type === 'academy',
  }
  const country = {
    korea: countryCode === 'KR',
    vietnam: countryCode === 'VN',
    indonesia: countryCode === 'ID',
  }
  const isPaymentable = needPayment === 'Y'
  const paymentUrl = target.private
    ? SITE_PATH.HOME.MEMBERSHIP_PAYMENT
    : SITE_PATH.HOME.RG_PAYMENT

  const customerCenterUrl = CUSTOMER_CENTER_URL[type]

  const isPrivateSchoolOnly = target.private || target.school
  const isKoreaPrivateOnly = target.private && country.korea

  return {
    target,
    country,
    // LC, MS, PD, JN, ES 모두 비활성화 (7차 학습프로그램 부제)
    studyOpen: {
      EB: studyEBUseYn,
      PB: studyPBUseYn,
      LC: studyLCUseYn && false,
      MS: studyMSUseYn && false,
      PD: studyPDUseYn && false,
      JN: studyJNUseYn && false,
      ES: studyESUseYn && false,
      PreK: preKMode.includes('P'),
      DodoABC: preKMode.includes('D'),
      Speak: useSpeakYn,
    },
    studentOpen: {
      changeUserName: target.private,
      nameMaxLangth: target.private && country.korea ? 10 : -1,
      userEmail: target.private,
      phoneNumber: target.private,
      reportSetting: target.private,
      suspendSetting: target.private,
      withdraw: target.private,
    },
    main: {
      isHidodoBanner: target.private,
      isSotialRgPost: true,
    },
    isStudentNoLogin: useStudentNoYn,
    isChallengeMenu: isPrivateSchoolOnly,
    isNewsLetter: isKoreaPrivateOnly,
    isSnsMenuOpen: isKoreaPrivateOnly,
    isShowLevelMasterRanking: isPrivateSchoolOnly,
    isOnStudySetting: isPrivateSchoolOnly,
    isShowStudyEndInform: target.private,
    isPaymentable,
    paymentUrl,
    isShowStudyEndDay: target.private,
    customLogo:
      !target.private && customer.logoFilename
        ? customer.logoFilename
        : undefined,
    customerCenterUrl,
    isFirstPreK: preKMode.length > 0 && preKMode.indexOf('P') === 0,
  }
}

export function newSiteBlueprint(): SiteBlueprint {
  return {
    target: {
      private: false,
      school: false,
      academy: false,
    },
    country: {
      korea: false,
      vietnam: false,
      indonesia: false,
    },
    studyOpen: {
      EB: false,
      PB: false,
      LC: false,
      MS: false,
      PD: false,
      JN: false,
      ES: false,
      PreK: false,
      DodoABC: false,
      Speak: false,
    },
    studentOpen: {
      changeUserName: false,
      nameMaxLangth: -1,
      userEmail: false,
      phoneNumber: false,
      reportSetting: false,
      suspendSetting: false,
      withdraw: false,
    },
    main: {
      isHidodoBanner: false,
      isSotialRgPost: false,
    },
    isStudentNoLogin: false,
    isChallengeMenu: false,
    isNewsLetter: false,
    isSnsMenuOpen: false,
    isShowLevelMasterRanking: false,
    isOnStudySetting: false,
    isShowStudyEndInform: false,
    isShowStudyEndDay: false,
    isPaymentable: false,
    paymentUrl: '',
    customerCenterUrl: '',
    isFirstPreK: false,
  }
}
