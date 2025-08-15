import { I18n } from 'i18n-js';
import { TranslationKeys } from '../types';

const translations = {
  en: {
    // Navigation
    home: 'Home',
    reminders: 'Reminders',
    progressNav: 'Progress',
    rewards: 'Rewards',
    settings: 'Settings',

    // Home Screen
    chooseBuddy: 'Choose Your Potty Buddy!',
    smallPotty: 'Small Potty',
    bigPotty: 'Big Potty',
    cheeringMessage: 'is cheering you on!',
    tapInstruction: 'Tap a potty button when you go!',
    greatJob: 'Great Job!',
    amazingMessage: "You're doing amazing!",
    bigKidMessage: "Remember: Big kids use the potty. You're becoming such a big kid!",
    
    // Character Names
    bear: 'Bear',
    rabbit: 'Rabbit',
    lion: 'Lion',
    elephant: 'Elephant',

    // Settings
    language: 'Language',
    notifications: 'Notifications',
    enableReminders: 'Enable Reminders',
    aboutPottyPal: 'About Potty Pal',
    version: 'Version 1.0.0',
    madeWithLove: 'Made with ❤️ for little potty champions!',
    languageChanged: 'Language changed successfully!',

    // Reminders Screen
    todaysSchedule: "Today's Potty Schedule",
    complete: 'Complete',
    addNewReminder: 'Add New Reminder',
    morningPotty: 'Morning Potty',
    midMorning: 'Mid-Morning',
    afterLunch: 'After Lunch',
    afternoon: 'Afternoon',
    beforeDinner: 'Before Dinner',
    bedtimePotty: 'Bedtime Potty',
    remindersSet: 'Reminders Set!',
    outOf: 'out of',
    remindersActive: 'reminders are active!',

    // Progress Screen
    todaysProgress: "Today's Progress",
    smallPottyLabel: 'Small Potty',
    bigPottyLabel: 'Big Potty',
    pottyJourney: 'Your Potty Journey',
    success: 'Success!',
    goodTry: 'Good Try',
    notYet: 'Not Yet',
    thisWeek: 'This Week',
    keepGoing: 'Keep Going!',
    encouragementMessage: 'Every try makes you stronger!',

    // Rewards Screen
    pottyRewards: 'Potty Rewards',
    earned: 'Earned',
    totalSuccess: 'Total Success',
    nextReward: 'Next Reward',
    progressLabel: 'Progress',
    unlocked: 'Unlocked!',
    firstTry: 'First Try!',
    firstTryDesc: 'Used the potty for the first time',
    highFive: 'High Five!',
    highFiveDesc: 'Used the potty 5 times',
    perfectTen: 'Perfect Ten!',
    perfectTenDesc: 'Used the potty 10 times',
    peeExpert: 'Pee Expert!',
    peeExpertDesc: 'Used the potty for pee 5 times',
    poopChampion: 'Poop Champion!',
    poopChampionDesc: 'Used the potty for poop 3 times',
    weekWarrior: 'Week Warrior!',
    weekWarriorDesc: 'Used the potty every day this week',
    amazingJob: 'Amazing Job!',
    earnedRewardMessage: "You've earned 1 reward! Keep up the great work!",

    // Days of week
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',

    // Loading Screen
    loadingTitle: 'Potty Pal',
    loadingSubtitle: 'Getting ready for potty adventures! 🚽✨',
  },

  ar: {
    // Navigation
    home: 'الصفحة الرئيسية',
    reminders: 'التذكيرات',
    progressNav: 'التقدم',
    rewards: 'المكافآت',
    settings: 'الإعدادات',

    // Home Screen
    chooseBuddy: 'اختر صديق النونية!',
    smallPotty: 'نونية صغيرة',
    bigPotty: 'نونية كبيرة',
    cheeringMessage: 'يشجعك بكل حماس!',
    tapInstruction: 'اضغط على زر النونية عندما تذهب إلى الحمام!',
    greatJob: 'أحسنت!',
    amazingMessage: 'أنت رائع جدًا!',
    bigKidMessage: 'تذكر: الأطفال الكبار يستخدمون النونية. وأنت الآن تكبر وتصبح بطلًا!',
    
    // Character Names
    bear: 'الدب',
    rabbit: 'الأرنب',
    lion: 'الأسد',
    elephant: 'الفيل',

    // Settings
    language: 'اللغة',
    notifications: 'الإشعارات',
    enableReminders: 'تفعيل التذكيرات',
    aboutPottyPal: 'حول تطبيق النونية',
    version: 'الإصدار 1.0.0',
    madeWithLove: 'صُنع بحب لأبطال النونية الصغار ❤️',
    languageChanged: 'تم تغيير اللغة بنجاح!',

    // Reminders Screen
    todaysSchedule: 'جدول النونية اليوم',
    complete: 'تم',
    addNewReminder: 'إضافة تذكير جديد',
    morningPotty: 'نونية الصباح',
    midMorning: 'منتصف الصباح',
    afterLunch: 'بعد الغداء',
    afternoon: 'فترة الظهيرة',
    beforeDinner: 'قبل العشاء',
    bedtimePotty: 'نونية وقت النوم',
    remindersSet: 'تم تعيين التذكيرات!',
    outOf: 'من أصل',
    remindersActive: 'تذكيرات نشطة!',

    // Progress Screen
    todaysProgress: 'تقدمك اليوم',
    smallPottyLabel: 'نونية صغيرة',
    bigPottyLabel: 'نونية كبيرة',
    pottyJourney: 'رحلتك مع النونية',
    success: 'نجاح!',
    goodTry: 'محاولة رائعة',
    notYet: 'ليس بعد',
    thisWeek: 'هذا الأسبوع',
    keepGoing: 'تابع يا بطل!',
    encouragementMessage: 'كل محاولة تقربك من النجاح!',

    // Rewards Screen
    pottyRewards: 'مكافآت النونية',
    earned: 'تم الحصول عليها',
    totalSuccess: 'عدد النجاحات',
    nextReward: 'المكافأة القادمة',
    progressLabel: 'التقدم',
    unlocked: 'تم الفتح!',
    firstTry: 'أول محاولة!',
    firstTryDesc: 'ذهبت إلى النونية لأول مرة',
    highFive: 'هاي فايف!',
    highFiveDesc: 'ذهبت إلى النونية 5 مرات!',
    perfectTen: 'عشرة على عشرة!',
    perfectTenDesc: 'ذهبت إلى النونية 10 مرات!',
    peeExpert: 'خبير التبول!',
    peeExpertDesc: 'ذهبت للتبول 5 مرات!',
    poopChampion: 'بطل البراز!',
    poopChampionDesc: 'ذهبت للبراز 3 مرات!',
    weekWarrior: 'محارب الأسبوع!',
    weekWarriorDesc: 'ذهبت إلى النونية كل يوم هذا الأسبوع!',
    amazingJob: 'عمل رائع!',
    earnedRewardMessage: 'لقد حصلت على مكافأة! استمر في التألق يا بطل!',

    // Days of week
    sun: 'الأحد',
    mon: 'الاثنين',
    tue: 'الثلاثاء',
    wed: 'الأربعاء',
    thu: 'الخميس',
    fri: 'الجمعة',
    sat: 'السبت',

    // Loading Screen
    loadingTitle: 'صديق النونية',
    loadingSubtitle: 'نستعد لمغامرات النونية! 🚽✨',
  },

  no: {
    // Navigation
    home: 'Hjem',
    reminders: 'Påminnelser',
    progressNav: 'Fremgang',
    rewards: 'Belønninger',
    settings: 'Innstillinger',

    // Home Screen
    chooseBuddy: 'Velg din potte-kompis!',
    smallPotty: 'Liten potte',
    bigPotty: 'Stor potte',
    cheeringMessage: 'heier på deg!',
    tapInstruction: 'Trykk på en potte-knapp når du går!',
    greatJob: 'Flott jobb!',
    amazingMessage: 'Du gjør det fantastisk!',
    bigKidMessage: 'Husk: Store barn bruker potten. Du blir et så stort barn!',
    
    // Character Names
    bear: 'Bjørn',
    rabbit: 'Kanin',
    lion: 'Løve',
    elephant: 'Elefant',

    // Settings
    language: 'Språk',
    notifications: 'Varsler',
    enableReminders: 'Aktiver påminnelser',
    aboutPottyPal: 'Om Potte Pal',
    version: 'Versjon 1.0.0',
    madeWithLove: 'Laget med ❤️ for små potte-kjemper!',
    languageChanged: 'Språk endret!',

    // Reminders Screen
    todaysSchedule: 'Dagens potteplan',
    complete: 'Fullført',
    addNewReminder: 'Legg til ny påminnelse',
    morningPotty: 'Morgenspotte',
    midMorning: 'Midt på morgenen',
    afterLunch: 'Etter lunsj',
    afternoon: 'Ettermiddag',
    beforeDinner: 'Før middag',
    bedtimePotty: 'Kveldenspotte',
    remindersSet: 'Påminnelser satt!',
    outOf: 'av',
    remindersActive: 'påminnelser er aktive!',

    // Progress Screen
    todaysProgress: 'Dagens fremgang',
    smallPottyLabel: 'Liten potte',
    bigPottyLabel: 'Stor potte',
    pottyJourney: 'Din potte-reise',
    success: 'Suksess!',
    goodTry: 'Godt forsøk',
    notYet: 'Ikke ennå',
    thisWeek: 'Denne uken',
    keepGoing: 'Fortsett!',
    encouragementMessage: 'Hvert forsøk gjør deg sterkere!',

    // Rewards Screen
    pottyRewards: 'Potte-belønninger',
    earned: 'Opptjent',
    totalSuccess: 'Total suksess',
    nextReward: 'Neste belønning',
    progressLabel: 'Fremgang',
    unlocked: 'Låst opp!',
    firstTry: 'Første forsøk!',
    firstTryDesc: 'Brukte potten for første gang',
    highFive: 'High Five!',
    highFiveDesc: 'Brukte potten 5 ganger',
    perfectTen: 'Perfekt ti!',
    perfectTenDesc: 'Brukte potten 10 ganger',
    peeExpert: 'Tisse-ekspert!',
    peeExpertDesc: 'Brukte potten for tisse 5 ganger',
    poopChampion: 'Bæsj-mester!',
    poopChampionDesc: 'Brukte potten for bæsj 3 ganger',
    weekWarrior: 'Uke-kriger!',
    weekWarriorDesc: 'Brukte potten hver dag denne uken',
    amazingJob: 'Fantastisk jobb!',
    earnedRewardMessage: 'Du har tjent 1 belønning! Fortsett det gode arbeidet!',

    // Days of week
    sun: 'Søn',
    mon: 'Man',
    tue: 'Tir',
    wed: 'Ons',
    thu: 'Tor',
    fri: 'Fre',
    sat: 'Lør',

    // Loading Screen
    loadingTitle: 'Potte Pal',
    loadingSubtitle: 'Gjør seg klar for potte-eventyr! 🚽✨',
  },
};

const i18n = new I18n(translations);
i18n.defaultLocale = 'en';
i18n.locale = 'en';

export { i18n, translations };
export type { TranslationKeys };

