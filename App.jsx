

import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS (7 languages) ──────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    name: "English", flag: "🇬🇧",
    appName: "BusGo", tagline: "Rural Bus Ticketing",
    home: "Home", login: "Login", register: "Register",
    dashboard: "Dashboard", bookTicket: "Book Ticket",
    trackBus: "Track Bus", payment: "Payment", feedback: "Feedback",
    logout: "Logout", welcome: "Welcome back",
    heroTitle: "Your Village,", heroTitleAccent: "Connected.",
    heroSub: "Book nearby bus tickets instantly. Pay digitally to conductor. No change needed.",
    getStarted: "Get Started", learnMore: "Learn More",
    features: "Why BusGo?", featInstant: "Instant Booking",
    featInstantDesc: "Book your seat in seconds, anytime anywhere.",
    featDigital: "Digital Payment", featDigitalDesc: "Pay conductor digitally — no change needed.",
    featTrack: "Live Tracking", featTrackDesc: "Know exactly where your bus is, in real time.",
    featFeedback: "Share Feedback", featFeedbackDesc: "Help improve bus services with your reviews.",
    loginTitle: "Welcome Back", registerTitle: "Create Account",
    email: "Email / Mobile", password: "Password", name: "Full Name",
    otp: "Enter OTP", sendOtp: "Send OTP", verifyOtp: "Verify OTP",
    loginBtn: "Login", registerBtn: "Register",
    noAccount: "Don't have an account?", hasAccount: "Already have an account?",
    from: "From (Village/Town)", to: "To (Village/Town)", date: "Date",
    searchBuses: "Search Buses", availableBuses: "Available Buses",
    seats: "seats left", bookNow: "Book Now", busName: "Bus Name",
    departs: "Departs", arrives: "Arrives", fare: "Fare", class: "Type",
    ticketConfirmed: "Ticket Confirmed!", ticketId: "Ticket ID",
    passenger: "Passenger", journey: "Journey", downloadTicket: "Download Ticket",
    payNow: "Pay Now", payToConductor: "Pay to Conductor",
    amount: "Amount", paymentSuccess: "Payment Successful!",
    paymentFail: "Payment Failed. Try again.",
    processingPayment: "Processing...", scanQr: "Scan QR to pay conductor",
    busLocation: "Live Bus Location", lastUpdated: "Last updated",
    speed: "Speed", eta: "ETA", busNo: "Bus No.",
    yourFeedback: "Your Feedback", rating: "Rating",
    feedbackMsg: "Your message", submitFeedback: "Submit Feedback",
    thanksFeedback: "Thank you for your feedback!",
    recentFeedback: "Recent Feedback",
    myTickets: "My Tickets", quickActions: "Quick Actions",
    active: "Active", completed: "Completed", cancelled: "Cancelled",
    kmh: "km/h", mins: "mins away", stars: "stars",
    liveStatus: "Live Status", currentStop: "Current Stop",
    nextStop: "Next Stop", distanceAway: "km away",
    busOnTime: "On Time", busDelayed: "Delayed", busArrived: "Arrived",
    villageRoute: "Village Route", shortDistance: "Short Route",
    totalDistance: "Distance", stops: "Stops",
    boardingPoint: "Boarding Point", droppingPoint: "Dropping Point",
    nearbyBuses: "Nearby Buses", arrivingSoon: "Arriving Soon",
    liveTracking: "LIVE", busStatus: "Bus Status",
    minutesLate: "mins late", minutesEarly: "mins early",
    reachesYourStop: "Reaches your stop in",
    selectStop: "Select Stop",
  },
  hi: {
    name: "हिंदी", flag: "🇮🇳",
    appName: "बसगो", tagline: "ग्रामीण बस टिकटिंग",
    home: "होम", login: "लॉगिन", register: "रजिस्टर",
    dashboard: "डैशबोर्ड", bookTicket: "टिकट बुक करें",
    trackBus: "बस ट्रैक करें", payment: "भुगतान", feedback: "प्रतिक्रिया",
    logout: "लॉगआउट", welcome: "वापस स्वागत है",
    heroTitle: "आपका गाँव,", heroTitleAccent: "जुड़ा हुआ।",
    heroSub: "नजदीकी बस टिकट तुरंत बुक करें। कंडक्टर को डिजिटल भुगतान करें।",
    getStarted: "शुरू करें", learnMore: "और जानें",
    features: "बसगो क्यों?", featInstant: "तुरंत बुकिंग",
    featInstantDesc: "कहीं भी, कभी भी सेकंड में सीट बुक करें।",
    featDigital: "डिजिटल भुगतान", featDigitalDesc: "कंडक्टर को डिजिटल भुगतान।",
    featTrack: "लाइव ट्रैकिंग", featTrackDesc: "जानिए आपकी बस कहाँ है।",
    featFeedback: "प्रतिक्रिया दें", featFeedbackDesc: "अपनी समीक्षा दें।",
    loginTitle: "वापस स्वागत है", registerTitle: "खाता बनाएं",
    email: "ईमेल / मोबाइल", password: "पासवर्ड", name: "पूरा नाम",
    otp: "OTP दर्ज करें", sendOtp: "OTP भेजें", verifyOtp: "OTP सत्यापित करें",
    loginBtn: "लॉगिन", registerBtn: "रजिस्टर",
    noAccount: "खाता नहीं है?", hasAccount: "पहले से खाता है?",
    from: "कहाँ से (गाँव/शहर)", to: "कहाँ तक (गाँव/शहर)", date: "तारीख",
    searchBuses: "बस खोजें", availableBuses: "उपलब्ध बसें",
    seats: "सीटें बची", bookNow: "अभी बुक करें", busName: "बस का नाम",
    departs: "प्रस्थान", arrives: "आगमन", fare: "किराया", class: "प्रकार",
    ticketConfirmed: "टिकट कन्फर्म!", ticketId: "टिकट ID",
    passenger: "यात्री", journey: "यात्रा", downloadTicket: "टिकट डाउनलोड",
    payNow: "अभी भुगतान करें", payToConductor: "कंडक्टर को भुगतान",
    amount: "राशि", paymentSuccess: "भुगतान सफल!", paymentFail: "भुगतान विफल।",
    processingPayment: "प्रोसेसिंग...", scanQr: "QR स्कैन करें",
    busLocation: "लाइव बस स्थान", lastUpdated: "अंतिम अपडेट",
    speed: "गति", eta: "ETA", busNo: "बस नं.",
    yourFeedback: "आपकी प्रतिक्रिया", rating: "रेटिंग",
    feedbackMsg: "आपका संदेश", submitFeedback: "प्रतिक्रिया भेजें",
    thanksFeedback: "धन्यवाद!", recentFeedback: "हाल की प्रतिक्रिया",
    myTickets: "मेरे टिकट", quickActions: "त्वरित क्रियाएं",
    active: "सक्रिय", completed: "पूर्ण", cancelled: "रद्द",
    kmh: "किमी/घं", mins: "मिनट दूर",
    liveStatus: "लाइव स्थिति", currentStop: "वर्तमान स्टॉप",
    nextStop: "अगला स्टॉप", distanceAway: "किमी दूर",
    busOnTime: "समय पर", busDelayed: "देरी", busArrived: "पहुँच गई",
    villageRoute: "ग्रामीण रूट", shortDistance: "छोटा रूट",
    totalDistance: "दूरी", stops: "स्टॉप",
    boardingPoint: "चढ़ने का स्थान", droppingPoint: "उतरने का स्थान",
    nearbyBuses: "नजदीकी बसें", arrivingSoon: "जल्द आ रही है",
    liveTracking: "लाइव", busStatus: "बस स्थिति",
    minutesLate: "मिनट देरी", minutesEarly: "मिनट पहले",
    reachesYourStop: "आपके स्टॉप पर पहुँचेगी",
    selectStop: "स्टॉप चुनें",
  },
  kn: {
    name: "ಕನ್ನಡ", flag: "🇮🇳",
    appName: "ಬಸ್‌ಗೋ", tagline: "ಗ್ರಾಮೀಣ ಬಸ್ ಟಿಕೆಟಿಂಗ್",
    home: "ಮುಖಪುಟ", login: "ಲಾಗಿನ್", register: "ನೋಂದಣಿ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", bookTicket: "ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ",
    trackBus: "ಬಸ್ ಟ್ರ್ಯಾಕ್", payment: "ಪಾವತಿ", feedback: "ಪ್ರತಿಕ್ರಿಯೆ",
    logout: "ಲಾಗ್‌ಔಟ್", welcome: "ಮರಳಿ ಸ್ವಾಗತ",
    heroTitle: "ನಿಮ್ಮ ಹಳ್ಳಿ,", heroTitleAccent: "ಸಂಪರ್ಕಗೊಂಡಿದೆ.",
    heroSub: "ಹತ್ತಿರದ ಬಸ್ ಟಿಕೆಟ್ ತಕ್ಷಣ ಬುಕ್ ಮಾಡಿ. ಕಂಡಕ್ಟರ್‌ಗೆ ಡಿಜಿಟಲ್ ಪಾವತಿ ಮಾಡಿ.",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ", learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    features: "ಬಸ್‌ಗೋ ಏಕೆ?", featInstant: "ತಕ್ಷಣ ಬುಕಿಂಗ್",
    featInstantDesc: "ಎಲ್ಲಿಂದಲಾದರೂ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಸೀಟು ಬುಕ್ ಮಾಡಿ.",
    featDigital: "ಡಿಜಿಟಲ್ ಪಾವತಿ", featDigitalDesc: "ಚಿಲ್ಲರೆ ಇಲ್ಲದೆ ಕಂಡಕ್ಟರ್‌ಗೆ ಪಾವತಿ ಮಾಡಿ.",
    featTrack: "ನೇರ ಟ್ರ್ಯಾಕಿಂಗ್", featTrackDesc: "ನಿಮ್ಮ ಬಸ್ ಎಲ್ಲಿದೆ ಎಂದು ತಿಳಿಯಿರಿ.",
    featFeedback: "ಪ್ರತಿಕ್ರಿಯೆ ಹಂಚಿಕೊಳ್ಳಿ", featFeedbackDesc: "ನಿಮ್ಮ ಅನುಭವ ಹಂಚಿಕೊಳ್ಳಿ.",
    loginTitle: "ಮರಳಿ ಸ್ವಾಗತ", registerTitle: "ಖಾತೆ ತೆರೆಯಿರಿ",
    email: "ಇಮೇಲ್ / ಮೊಬೈಲ್", password: "ಪಾಸ್‌ವರ್ಡ್", name: "ಪೂರ್ಣ ಹೆಸರು",
    otp: "OTP ನಮೂದಿಸಿ", sendOtp: "OTP ಕಳುಹಿಸಿ", verifyOtp: "OTP ಪರಿಶೀಲಿಸಿ",
    loginBtn: "ಲಾಗಿನ್", registerBtn: "ನೋಂದಣಿ",
    noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?", hasAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    from: "ಎಲ್ಲಿಂದ (ಹಳ್ಳಿ/ಪಟ್ಟಣ)", to: "ಎಲ್ಲಿಗೆ (ಹಳ್ಳಿ/ಪಟ್ಟಣ)", date: "ದಿನಾಂಕ",
    searchBuses: "ಬಸ್ ಹುಡುಕಿ", availableBuses: "ಲಭ್ಯ ಬಸ್‌ಗಳು",
    seats: "ಸೀಟುಗಳು ಬಾಕಿ", bookNow: "ಈಗ ಬುಕ್ ಮಾಡಿ", busName: "ಬಸ್ ಹೆಸರು",
    departs: "ಹೊರಡುತ್ತದೆ", arrives: "ತಲುಪುತ್ತದೆ", fare: "ದರ", class: "ವಿಧ",
    ticketConfirmed: "ಟಿಕೆಟ್ ದೃಢಪಟ್ಟಿದೆ!", ticketId: "ಟಿಕೆಟ್ ID",
    passenger: "ಪ್ರಯಾಣಿಕ", journey: "ಪ್ರಯಾಣ", downloadTicket: "ಟಿಕೆಟ್ ಡೌನ್‌ಲೋಡ್",
    payNow: "ಈಗ ಪಾವತಿ ಮಾಡಿ", payToConductor: "ಕಂಡಕ್ಟರ್‌ಗೆ ಪಾವತಿ",
    amount: "ಮೊತ್ತ", paymentSuccess: "ಪಾವತಿ ಯಶಸ್ವಿ!", paymentFail: "ಪಾವತಿ ವಿಫಲ.",
    processingPayment: "ಪ್ರಕ್ರಿಯೆ ನಡೆಯುತ್ತಿದೆ...", scanQr: "ಕಂಡಕ್ಟರ್‌ಗೆ QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    busLocation: "ನೇರ ಬಸ್ ಸ್ಥಳ", lastUpdated: "ಕೊನೆಯ ಅಪ್‌ಡೇಟ್",
    speed: "ವೇಗ", eta: "ETA", busNo: "ಬಸ್ ಸಂ.",
    yourFeedback: "ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆ", rating: "ರೇಟಿಂಗ್",
    feedbackMsg: "ನಿಮ್ಮ ಸಂದೇಶ", submitFeedback: "ಪ್ರತಿಕ್ರಿಯೆ ಸಲ್ಲಿಸಿ",
    thanksFeedback: "ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗೆ ಧನ್ಯವಾದ!",
    recentFeedback: "ಇತ್ತೀಚಿನ ಪ್ರತಿಕ್ರಿಯೆಗಳು",
    myTickets: "ನನ್ನ ಟಿಕೆಟ್‌ಗಳು", quickActions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
    active: "ಸಕ್ರಿಯ", completed: "ಮುಗಿದಿದೆ", cancelled: "ರದ್ದು",
    kmh: "ಕಿಮೀ/ಗಂ", mins: "ನಿಮಿಷ ದೂರ",
    liveStatus: "ನೇರ ಸ್ಥಿತಿ", currentStop: "ಪ್ರಸ್ತುತ ನಿಲ್ದಾಣ",
    nextStop: "ಮುಂದಿನ ನಿಲ್ದಾಣ", distanceAway: "ಕಿಮೀ ದೂರ",
    busOnTime: "ಸಮಯಕ್ಕೆ", busDelayed: "ತಡವಾಗಿದೆ", busArrived: "ತಲುಪಿದೆ",
    villageRoute: "ಹಳ್ಳಿ ಮಾರ್ಗ", shortDistance: "ಸಣ್ಣ ಮಾರ್ಗ",
    totalDistance: "ದೂರ", stops: "ನಿಲ್ದಾಣಗಳು",
    boardingPoint: "ಹತ್ತುವ ಸ್ಥಳ", droppingPoint: "ಇಳಿಯುವ ಸ್ಥಳ",
    nearbyBuses: "ಹತ್ತಿರದ ಬಸ್‌ಗಳು", arrivingSoon: "ಶೀಘ್ರದಲ್ಲಿ ಬರುತ್ತಿದೆ",
    liveTracking: "ನೇರ", busStatus: "ಬಸ್ ಸ್ಥಿತಿ",
    minutesLate: "ನಿಮಿಷ ತಡ", minutesEarly: "ನಿಮಿಷ ಮುಂಚೆ",
    reachesYourStop: "ನಿಮ್ಮ ನಿಲ್ದಾಣ ತಲುಪುತ್ತದೆ",
    selectStop: "ನಿಲ್ದಾಣ ಆಯ್ಕೆ ಮಾಡಿ",
  },
  ta: {
    name: "தமிழ்", flag: "🇮🇳",
    appName: "பஸ்கோ", tagline: "கிராமப்புற பஸ் டிக்கெட்",
    home: "முகப்பு", login: "உள்நுழைவு", register: "பதிவு",
    dashboard: "டாஷ்போர்டு", bookTicket: "டிக்கெட் பதிவு",
    trackBus: "பஸ் கண்காணிப்பு", payment: "கட்டணம்", feedback: "கருத்து",
    logout: "வெளியேறு", welcome: "மீண்டும் வரவேற்கிறோம்",
    heroTitle: "உங்கள் கிராமம்,", heroTitleAccent: "இணைக்கப்பட்டுள்ளது.",
    heroSub: "அருகிலுள்ள பஸ் டிக்கெட் உடனடியாக பதிவு செய்யுங்கள். டிஜிட்டலாக செலுத்துங்கள்.",
    getStarted: "தொடங்கு", learnMore: "மேலும் அறிய",
    features: "ஏன் பஸ்கோ?", featInstant: "உடனடி பதிவு",
    featInstantDesc: "எங்கும் நொடியில் இடம் பதிவு செய்யுங்கள்.",
    featDigital: "டிஜிட்டல் கட்டணம்", featDigitalDesc: "நடத்துனருக்கு டிஜிட்டலாக செலுத்துங்கள்.",
    featTrack: "நேரலை கண்காணிப்பு", featTrackDesc: "பஸ் எங்கிருக்கிறது என்று தெரிந்துகொள்ளுங்கள்.",
    featFeedback: "கருத்து பகிருங்கள்", featFeedbackDesc: "உங்கள் அனுபவம் பகிருங்கள்.",
    loginTitle: "மீண்டும் வரவேற்கிறோம்", registerTitle: "கணக்கு உருவாக்கு",
    email: "மின்னஞ்சல் / மொபைல்", password: "கடவுச்சொல்", name: "முழு பெயர்",
    otp: "OTP உள்ளிடவும்", sendOtp: "OTP அனுப்பு", verifyOtp: "OTP சரிபார்",
    loginBtn: "உள்நுழைவு", registerBtn: "பதிவு செய்",
    noAccount: "கணக்கு இல்லையா?", hasAccount: "ஏற்கனவே கணக்கு இருக்கிறதா?",
    from: "எங்கிருந்து (கிராமம்/நகரம்)", to: "எங்கே (கிராமம்/நகரம்)", date: "தேதி",
    searchBuses: "பஸ் தேடு", availableBuses: "கிடைக்கும் பேருந்துகள்",
    seats: "இடங்கள் உள்ளன", bookNow: "இப்போது பதிவு", busName: "பஸ் பெயர்",
    departs: "புறப்படும்", arrives: "வரும்", fare: "கட்டணம்", class: "வகை",
    ticketConfirmed: "டிக்கெட் உறுதி!", ticketId: "டிக்கெட் ID",
    passenger: "பயணி", journey: "பயணம்", downloadTicket: "டிக்கெட் பதிவிறக்கு",
    payNow: "இப்போது செலுத்து", payToConductor: "நடத்துனருக்கு செலுத்து",
    amount: "தொகை", paymentSuccess: "கட்டணம் வெற்றி!", paymentFail: "கட்டணம் தோல்வி.",
    processingPayment: "செயலாக்குகிறது...", scanQr: "QR ஸ்கேன் செய்யுங்கள்",
    busLocation: "நேரலை பஸ் இருப்பிடம்", lastUpdated: "கடைசி புதுப்பிப்பு",
    speed: "வேகம்", eta: "ETA", busNo: "பஸ் எண்.",
    yourFeedback: "உங்கள் கருத்து", rating: "மதிப்பீடு",
    feedbackMsg: "உங்கள் செய்தி", submitFeedback: "கருத்து சமர்ப்பி",
    thanksFeedback: "நன்றி!", recentFeedback: "சமீபத்திய கருத்துகள்",
    myTickets: "என் டிக்கெட்கள்", quickActions: "விரைவு செயல்கள்",
    active: "செயலில்", completed: "முடிந்தது", cancelled: "ரத்து",
    kmh: "கிமீ/மணி", mins: "நிமிடங்கள்",
    liveStatus: "நேரலை நிலை", currentStop: "தற்போதைய நிறுத்தம்",
    nextStop: "அடுத்த நிறுத்தம்", distanceAway: "கிமீ தொலைவு",
    busOnTime: "சரியான நேரம்", busDelayed: "தாமதம்", busArrived: "வந்தது",
    villageRoute: "கிராம பாதை", shortDistance: "குறுகிய பாதை",
    totalDistance: "தூரம்", stops: "நிறுத்தங்கள்",
    boardingPoint: "ஏறும் இடம்", droppingPoint: "இறங்கும் இடம்",
    nearbyBuses: "அருகிலுள்ள பேருந்துகள்", arrivingSoon: "விரைவில் வருகிறது",
    liveTracking: "நேரலை", busStatus: "பஸ் நிலை",
    minutesLate: "நிமிட தாமதம்", minutesEarly: "நிமிடம் முன்னதாக",
    reachesYourStop: "உங்கள் நிறுத்தத்தை அடையும்",
    selectStop: "நிறுத்தம் தேர்வு",
  },
  te: {
    name: "తెలుగు", flag: "🇮🇳",
    appName: "బస్‌గో", tagline: "గ్రామీణ బస్ టిక్కెటింగ్",
    home: "హోమ్", login: "లాగిన్", register: "నమోదు",
    dashboard: "డాష్‌బోర్డ్", bookTicket: "టిక్కెట్ బుక్",
    trackBus: "బస్ ట్రాక్", payment: "చెల్లింపు", feedback: "అభిప్రాయం",
    logout: "లాగ్అవుట్", welcome: "తిరిగి స్వాగతం",
    heroTitle: "మీ గ్రామం,", heroTitleAccent: "అనుసంధానించబడింది.",
    heroSub: "దగ్గరలోని బస్ టిక్కెట్ వెంటనే బుక్ చేయండి. డిజిటల్‌గా చెల్లించండి.",
    getStarted: "ప్రారంభించండి", learnMore: "మరింత తెలుసుకోండి",
    features: "బస్‌గో ఎందుకు?", featInstant: "తక్షణ బుకింగ్",
    featInstantDesc: "సెకన్లలో సీట్ బుక్ చేయండి.", featDigital: "డిజిటల్ చెల్లింపు",
    featDigitalDesc: "చిల్లర లేకుండా కండక్టర్‌కు చెల్లించండి.",
    featTrack: "లైవ్ ట్రాకింగ్", featTrackDesc: "బస్ ఎక్కడ ఉందో తెలుసుకోండి.",
    featFeedback: "అభిప్రాయం పంచుకోండి", featFeedbackDesc: "మీ అనుభవం పంచుకోండి.",
    loginTitle: "తిరిగి స్వాగతం", registerTitle: "ఖాతా సృష్టించండి",
    email: "ఇమెయిల్ / మొబైల్", password: "పాస్‌వర్డ్", name: "పూర్తి పేరు",
    otp: "OTP నమోదు", sendOtp: "OTP పంపండి", verifyOtp: "OTP ధృవీకరించండి",
    loginBtn: "లాగిన్", registerBtn: "నమోదు",
    noAccount: "ఖాతా లేదా?", hasAccount: "ఖాతా ఉందా?",
    from: "ఎక్కడ నుండి (గ్రామం/పట్టణం)", to: "ఎక్కడికి (గ్రామం/పట్టణం)", date: "తేదీ",
    searchBuses: "బస్ వెతకండి", availableBuses: "అందుబాటులో ఉన్న బస్సులు",
    seats: "సీట్లు మిగిలాయి", bookNow: "ఇప్పుడే బుక్", busName: "బస్ పేరు",
    departs: "బయలుదేరు", arrives: "చేరుకుంటుంది", fare: "చార్జ్", class: "రకం",
    ticketConfirmed: "టిక్కెట్ నిర్ధారణ!", ticketId: "టిక్కెట్ ID",
    passenger: "ప్రయాణికుడు", journey: "ప్రయాణం", downloadTicket: "టిక్కెట్ డౌన్‌లోడ్",
    payNow: "ఇప్పుడు చెల్లించండి", payToConductor: "కండక్టర్‌కు చెల్లించండి",
    amount: "మొత్తం", paymentSuccess: "చెల్లింపు విజయం!", paymentFail: "చెల్లింపు విఫలం.",
    processingPayment: "ప్రాసెస్ అవుతోంది...", scanQr: "QR స్కాన్ చేయండి",
    busLocation: "లైవ్ బస్ స్థానం", lastUpdated: "చివరిగా నవీకరించబడింది",
    speed: "వేగం", eta: "ETA", busNo: "బస్ నం.",
    yourFeedback: "మీ అభిప్రాయం", rating: "రేటింగ్",
    feedbackMsg: "మీ సందేశం", submitFeedback: "సమర్పించండి",
    thanksFeedback: "ధన్యవాదాలు!", recentFeedback: "ఇటీవలి అభిప్రాయాలు",
    myTickets: "నా టిక్కెట్లు", quickActions: "త్వరిత చర్యలు",
    active: "చురుకుగా", completed: "పూర్తయింది", cancelled: "రద్దు",
    kmh: "కిమీ/గం", mins: "నిమిషాలు దూరంలో",
    liveStatus: "లైవ్ స్థితి", currentStop: "ప్రస్తుత స్టాప్",
    nextStop: "తదుపరి స్టాప్", distanceAway: "కిమీ దూరంలో",
    busOnTime: "సమయానికి", busDelayed: "ఆలస్యం", busArrived: "వచ్చింది",
    villageRoute: "గ్రామ మార్గం", shortDistance: "చిన్న మార్గం",
    totalDistance: "దూరం", stops: "స్టాప్‌లు",
    boardingPoint: "ఎక్కే స్థలం", droppingPoint: "దిగే స్థలం",
    nearbyBuses: "దగ్గరలోని బస్సులు", arrivingSoon: "త్వరలో వస్తోంది",
    liveTracking: "లైవ్", busStatus: "బస్ స్థితి",
    minutesLate: "నిమిషాలు ఆలస్యం", minutesEarly: "నిమిషాలు ముందు",
    reachesYourStop: "మీ స్టాప్ చేరుకుంటుంది",
    selectStop: "స్టాప్ ఎంచుకోండి",
  },
  fr: {
    name: "Français", flag: "🇫🇷",
    appName: "BusGo", tagline: "Billetterie Bus Rural",
    home: "Accueil", login: "Connexion", register: "S'inscrire",
    dashboard: "Tableau", bookTicket: "Réserver",
    trackBus: "Suivre", payment: "Paiement", feedback: "Avis",
    logout: "Déconnexion", welcome: "Bienvenue",
    heroTitle: "Votre village,", heroTitleAccent: "Connecté.",
    heroSub: "Réservez des billets de bus à proximité. Payez numériquement.",
    getStarted: "Commencer", learnMore: "En savoir plus",
    features: "Pourquoi BusGo?", featInstant: "Réservation rapide",
    featInstantDesc: "Réservez en secondes.", featDigital: "Paiement numérique",
    featDigitalDesc: "Payez sans monnaie.", featTrack: "Suivi en direct",
    featTrackDesc: "Suivez votre bus.", featFeedback: "Partagez vos avis",
    featFeedbackDesc: "Améliorez les services.",
    loginTitle: "Bienvenue", registerTitle: "Créer un compte",
    email: "Email / Mobile", password: "Mot de passe", name: "Nom complet",
    otp: "Entrer OTP", sendOtp: "Envoyer OTP", verifyOtp: "Vérifier OTP",
    loginBtn: "Connexion", registerBtn: "S'inscrire",
    noAccount: "Pas de compte?", hasAccount: "Déjà un compte?",
    from: "De (Village/Ville)", to: "À (Village/Ville)", date: "Date",
    searchBuses: "Chercher", availableBuses: "Bus disponibles",
    seats: "sièges", bookNow: "Réserver", busName: "Nom du bus",
    departs: "Départ", arrives: "Arrivée", fare: "Tarif", class: "Type",
    ticketConfirmed: "Billet confirmé!", ticketId: "ID Billet",
    passenger: "Passager", journey: "Trajet", downloadTicket: "Télécharger",
    payNow: "Payer", payToConductor: "Payer au conducteur",
    amount: "Montant", paymentSuccess: "Paiement réussi!", paymentFail: "Échec.",
    processingPayment: "Traitement...", scanQr: "Scanner QR",
    busLocation: "Position du bus", lastUpdated: "Mis à jour",
    speed: "Vitesse", eta: "ETA", busNo: "Bus N°",
    yourFeedback: "Votre avis", rating: "Note",
    feedbackMsg: "Votre message", submitFeedback: "Soumettre",
    thanksFeedback: "Merci!", recentFeedback: "Avis récents",
    myTickets: "Mes billets", quickActions: "Actions rapides",
    active: "Actif", completed: "Terminé", cancelled: "Annulé",
    kmh: "km/h", mins: "minutes",
    liveStatus: "Statut live", currentStop: "Arrêt actuel",
    nextStop: "Prochain arrêt", distanceAway: "km",
    busOnTime: "À l'heure", busDelayed: "En retard", busArrived: "Arrivé",
    villageRoute: "Route rurale", shortDistance: "Courte route",
    totalDistance: "Distance", stops: "Arrêts",
    boardingPoint: "Montée", droppingPoint: "Descente",
    nearbyBuses: "Bus proches", arrivingSoon: "Arrive bientôt",
    liveTracking: "LIVE", busStatus: "Statut bus",
    minutesLate: "min retard", minutesEarly: "min avance",
    reachesYourStop: "Atteint votre arrêt dans",
    selectStop: "Sélectionner arrêt",
  },
  ar: {
    name: "العربية", flag: "🇸🇦",
    appName: "باص‌غو", tagline: "تذاكر الحافلة الريفية",
    home: "الرئيسية", login: "دخول", register: "تسجيل",
    dashboard: "لوحة", bookTicket: "حجز تذكرة",
    trackBus: "تتبع", payment: "دفع", feedback: "رأي",
    logout: "خروج", welcome: "مرحبًا",
    heroTitle: "قريتك،", heroTitleAccent: "متصلة.",
    heroSub: "احجز تذاكر الحافلة القريبة فورًا. ادفع رقميًا.",
    getStarted: "ابدأ", learnMore: "المزيد",
    features: "لماذا باص‌غو؟", featInstant: "حجز فوري",
    featInstantDesc: "احجز في ثوانٍ.", featDigital: "دفع رقمي",
    featDigitalDesc: "ادفع بدون فكة.", featTrack: "تتبع مباشر",
    featTrackDesc: "اعرف أين حافلتك.", featFeedback: "شارك رأيك",
    featFeedbackDesc: "حسّن الخدمات.",
    loginTitle: "مرحبًا", registerTitle: "إنشاء حساب",
    email: "البريد / الجوال", password: "كلمة المرور", name: "الاسم الكامل",
    otp: "أدخل OTP", sendOtp: "إرسال OTP", verifyOtp: "تحقق",
    loginBtn: "دخول", registerBtn: "تسجيل",
    noAccount: "ليس لديك حساب؟", hasAccount: "لديك حساب؟",
    from: "من (القرية/المدينة)", to: "إلى (القرية/المدينة)", date: "التاريخ",
    searchBuses: "بحث", availableBuses: "الحافلات المتاحة",
    seats: "مقاعد", bookNow: "احجز", busName: "اسم الحافلة",
    departs: "مغادرة", arrives: "وصول", fare: "أجرة", class: "نوع",
    ticketConfirmed: "تأكيد التذكرة!", ticketId: "رقم التذكرة",
    passenger: "راكب", journey: "رحلة", downloadTicket: "تنزيل",
    payNow: "ادفع الآن", payToConductor: "ادفع للسائق",
    amount: "مبلغ", paymentSuccess: "تم الدفع!", paymentFail: "فشل الدفع.",
    processingPayment: "جار المعالجة...", scanQr: "امسح QR",
    busLocation: "موقع الحافلة", lastUpdated: "آخر تحديث",
    speed: "سرعة", eta: "وقت وصول", busNo: "رقم الحافلة",
    yourFeedback: "رأيك", rating: "تقييم",
    feedbackMsg: "رسالتك", submitFeedback: "إرسال",
    thanksFeedback: "شكرًا!", recentFeedback: "آراء حديثة",
    myTickets: "تذاكري", quickActions: "إجراءات سريعة",
    active: "نشط", completed: "مكتمل", cancelled: "ملغى",
    kmh: "كم/س", mins: "دقائق",
    liveStatus: "حالة مباشرة", currentStop: "المحطة الحالية",
    nextStop: "المحطة القادمة", distanceAway: "كم",
    busOnTime: "في الوقت", busDelayed: "متأخر", busArrived: "وصل",
    villageRoute: "طريق قروي", shortDistance: "مسار قصير",
    totalDistance: "المسافة", stops: "محطات",
    boardingPoint: "نقطة الركوب", droppingPoint: "نقطة النزول",
    nearbyBuses: "حافلات قريبة", arrivingSoon: "قادمة قريبًا",
    liveTracking: "مباشر", busStatus: "حالة الحافلة",
    minutesLate: "دقيقة تأخير", minutesEarly: "دقيقة مبكرًا",
    reachesYourStop: "يصل محطتك خلال",
    selectStop: "اختر محطة",
  },
};

// ─── RURAL ROUTE DATA ─────────────────────────────────────────────────────────
// Short-distance rural routes (Karnataka focused + other states)
const STOPS_MAP = {
  "KA-101": ["Mysuru", "Srirangapatna", "Mandya", "Maddur", "Channapatna", "Ramanagara", "Bengaluru"],
  "KA-202": ["Hubballi", "Dharwad", "Gadag", "Badami", "Bagalkot"],
  "KA-303": ["Mangaluru", "Udupi", "Kundapura", "Bhatkal", "Ankola"],
  "TN-101": ["Coimbatore", "Mettupalayam", "Ooty", "Kotagiri", "Coonoor"],
  "TN-202": ["Madurai", "Dindigul", "Palani", "Pollachi", "Udumalpet"],
  "AP-101": ["Vijayawada", "Guntur", "Ongole", "Nellore"],
  "MH-101": ["Pune", "Lonavala", "Khopoli", "Panvel", "Navi Mumbai"],
};

const RURAL_BUSES = [
  {
    id: "KA-101", name: "Mysuru Sarige", type: "KSRTC",
    stops: ["Mysuru", "Srirangapatna", "Mandya", "Maddur", "Channapatna", "Ramanagara", "Bengaluru"],
    timings: ["06:00", "06:18", "06:45", "07:10", "07:35", "08:05", "09:00"],
    fare_per_km: 1.2, total_km: 139, seats: 18, color: "#667eea",
    currentStopIndex: 2, delayMins: 0, speed: 52,
    description: "Connects Mysuru to Bengaluru via villages",
  },
  {
    id: "KA-102", name: "Mandya Chaluvadi", type: "KSRTC",
    stops: ["Mysuru", "Srirangapatna", "Mandya", "Maddur", "Channapatna", "Ramanagara", "Bengaluru"],
    timings: ["08:30", "08:48", "09:15", "09:40", "10:05", "10:35", "11:30"],
    fare_per_km: 1.2, total_km: 139, seats: 6, color: "#38ef7d",
    currentStopIndex: 0, delayMins: 8, speed: 45,
    description: "Morning express via Mandya",
  },
  {
    id: "KA-202", name: "Hubballi-Badami Express", type: "KSRTC",
    stops: ["Hubballi", "Dharwad", "Gadag", "Badami", "Bagalkot"],
    timings: ["07:00", "07:25", "08:30", "09:45", "10:30"],
    fare_per_km: 1.1, total_km: 120, seats: 22, color: "#f6ad55",
    currentStopIndex: 1, delayMins: 0, speed: 55,
    description: "North Karnataka rural route",
  },
  {
    id: "TN-101", name: "Nilgiri Ghat Bus", type: "TNSTC",
    stops: ["Coimbatore", "Mettupalayam", "Ooty", "Kotagiri", "Coonoor"],
    timings: ["06:30", "07:15", "09:00", "09:45", "10:15"],
    fare_per_km: 1.3, total_km: 86, seats: 14, color: "#f093fb",
    currentStopIndex: 1, delayMins: 5, speed: 30,
    description: "Hill route through Nilgiris",
  },
  {
    id: "AP-101", name: "Krishna Delta Bus", type: "APSRTC",
    stops: ["Vijayawada", "Guntur", "Ongole", "Nellore"],
    timings: ["07:00", "08:00", "10:00", "12:00"],
    fare_per_km: 1.0, total_km: 180, seats: 9, color: "#38ef7d",
    currentStopIndex: 0, delayMins: 0, speed: 60,
    description: "Coastal Andhra route",
  },
  {
    id: "MH-101", name: "Sahyadri Ghat Express", type: "MSRTC",
    stops: ["Pune", "Lonavala", "Khopoli", "Panvel", "Navi Mumbai"],
    timings: ["07:30", "08:45", "09:30", "10:15", "11:00"],
    fare_per_km: 1.4, total_km: 98, seats: 11, color: "#667eea",
    currentStopIndex: 2, delayMins: 12, speed: 48,
    description: "Western Ghats scenic route",
  },
];

// All unique stops/cities
const ALL_STOPS = [...new Set(RURAL_BUSES.flatMap(b => b.stops))].sort();

const SAMPLE_FEEDBACKS = [
  { id: 1, user: "Raju (Mandya)", rating: 5, msg: "Now I don't need to carry change! Thank you BusGo.", time: "1 hour ago" },
  { id: 2, user: "Lakshmi (Mysuru)", rating: 4, msg: "Live tracking is very useful. I know when bus reaches my village.", time: "3 hours ago" },
  { id: 3, user: "Suresh (Hubballi)", rating: 5, msg: "ಬಸ್ ಎಲ್ಲಿದೆ ಅಂತ ತಿಳ್ಕೋಬಹುದು. ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!", time: "Yesterday" },
  { id: 4, user: "Meena (Ooty)", rating: 4, msg: "Hill route bus timing is accurate. Very helpful app.", time: "2 days ago" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function calcFare(bus, fromStop, toStop) {
  const fi = bus.stops.indexOf(fromStop);
  const ti = bus.stops.indexOf(toStop);
  if (fi === -1 || ti === -1 || fi >= ti) return 0;
  const fraction = (ti - fi) / (bus.stops.length - 1);
  return Math.round(bus.total_km * fraction * bus.fare_per_km);
}

function getStopETA(bus, stopIndex, currentIndex, delayMins) {
  if (stopIndex <= currentIndex) return "Passed";
  const baseTime = bus.timings[stopIndex];
  const [h, m] = baseTime.split(":").map(Number);
  const totalMins = h * 60 + m + delayMins;
  const nh = Math.floor(totalMins / 60) % 24;
  const nm = totalMins % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

function minsFromNow(timeStr) {
  if (timeStr === "Passed") return -1;
  const [h, m] = timeStr.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(h, m, 0, 0);
  return Math.round((target - now) / 60000);
}

const S = {
  page: { minHeight: "100vh", background: "#070d1a", color: "#e2e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif" },
  container: { maxWidth: 1100, margin: "0 auto", padding: "0 20px" },
  flex: (gap = 12) => ({ display: "flex", alignItems: "center", gap }),
  flexBetween: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  flexCol: (gap = 12) => ({ display: "flex", flexDirection: "column", gap }),
  card: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 16, padding: 20, backdropFilter: "blur(12px)",
  },
  input: {
    width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10, padding: "11px 14px", color: "#e2e8f0", fontSize: 15,
    outline: "none", boxSizing: "border-box",
  },
  select: {
    width: "100%", background: "rgba(10,15,35,0.95)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10, padding: "11px 14px", color: "#e2e8f0", fontSize: 15, outline: "none",
  },
  label: { fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 5, display: "block", letterSpacing: "0.5px" },
  h2: { fontSize: 26, fontWeight: 800, margin: 0 },
  h3: { fontSize: 19, fontWeight: 700, margin: 0 },
  h4: { fontSize: 15, fontWeight: 700, margin: 0 },
  sub: { color: "#64748b", fontSize: 14 },
  badge: (c = "#667eea") => ({
    background: c + "22", color: c, border: `1px solid ${c}44`,
    borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700, letterSpacing: "0.3px",
  }),
  btn: {
    primary: {
      background: "linear-gradient(135deg,#667eea,#764ba2)", color: "#fff",
      border: "none", borderRadius: 10, padding: "11px 24px",
      fontSize: 14, fontWeight: 700, cursor: "pointer",
    },
    secondary: {
      background: "rgba(255,255,255,0.07)", color: "#e2e8f0",
      border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10,
      padding: "11px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
    },
    success: {
      background: "linear-gradient(135deg,#11998e,#38ef7d)", color: "#fff",
      border: "none", borderRadius: 10, padding: "11px 24px",
      fontSize: 14, fontWeight: 700, cursor: "pointer",
    },
  },
};

function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
      <div style={{
        width: 36, height: 36, border: "3px solid rgba(102,126,234,0.2)",
        borderTopColor: "#667eea", borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─── LIVE BUS STATUS CARD (shown in search results) ───────────────────────────
function LiveBusStatusCard({ bus, fromStop, toStop, onBook, t }) {
  const [liveData, setLiveData] = useState({
    currentStopIndex: bus.currentStopIndex,
    delayMins: bus.delayMins,
    speed: bus.speed,
  });

  // Simulate live updates every 5 seconds
  useEffect(() => {
    const iv = setInterval(() => {
      setLiveData(prev => ({
        currentStopIndex: prev.currentStopIndex,
        delayMins: Math.max(0, prev.delayMins + (Math.random() > 0.7 ? 1 : Math.random() > 0.8 ? -1 : 0)),
        speed: Math.max(20, Math.min(80, prev.speed + Math.floor((Math.random() - 0.5) * 8))),
      }));
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const fromIdx = bus.stops.indexOf(fromStop);
  const toIdx = bus.stops.indexOf(toStop);
  const fare = calcFare(bus, fromStop, toStop);
  const eta = getStopETA(bus, fromIdx, liveData.currentStopIndex, liveData.delayMins);
  const minsLeft = minsFromNow(eta);
  const currentStopName = bus.stops[liveData.currentStopIndex];
  const nextStopName = bus.stops[Math.min(liveData.currentStopIndex + 1, bus.stops.length - 1)];
  const isDelayed = liveData.delayMins > 0;
  const busPassed = fromIdx <= liveData.currentStopIndex;
  const statusColor = busPassed ? "#94a3b8" : isDelayed ? "#f6ad55" : "#38ef7d";
  const statusText = busPassed ? t.busArrived : isDelayed ? `${liveData.delayMins} ${t.minutesLate}` : t.busOnTime;

  return (
    <div style={{
      ...S.card,
      borderLeft: `3px solid ${bus.color}`,
      background: "rgba(255,255,255,0.035)",
    }}>
      {/* Header Row */}
      <div style={S.flexBetween}>
        <div style={S.flex(10)}>
          <span style={{ fontSize: 26 }}>🚌</span>
          <div>
            <div style={S.flex(8)}>
              <span style={S.h4}>{bus.name}</span>
              <span style={{ ...S.badge(bus.color), fontSize: 10 }}>{bus.type}</span>
            </div>
            <div style={{ ...S.sub, fontSize: 12, marginTop: 2 }}>{bus.id} • {bus.description}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#38ef7d" }}>₹{fare}</div>
          <div style={{ ...S.sub, fontSize: 11 }}>{bus.seats} {t.seats}</div>
        </div>
      </div>

      {/* Route Progress Bar */}
      <div style={{ marginTop: 16, marginBottom: 4 }}>
        <div style={{ ...S.flexBetween, marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#667eea" }}>{fromStop}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#f5576c" }}>{toStop}</span>
        </div>
        <div style={{ position: "relative", height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
          {/* Full route dots */}
          {bus.stops.map((stop, idx) => {
            const pct = (idx / (bus.stops.length - 1)) * 100;
            const isPassed = idx <= liveData.currentStopIndex;
            const isFrom = stop === fromStop;
            const isTo = stop === toStop;
            const isCurrent = idx === liveData.currentStopIndex;
            return (
              <div key={stop} title={stop} style={{
                position: "absolute", left: `${pct}%`,
                top: "50%", transform: "translate(-50%,-50%)",
                width: isCurrent ? 12 : isFrom || isTo ? 10 : 6,
                height: isCurrent ? 12 : isFrom || isTo ? 10 : 6,
                borderRadius: "50%",
                background: isCurrent ? "#fff" : isPassed ? "#667eea" : isFrom ? "#38ef7d" : isTo ? "#f5576c" : "rgba(255,255,255,0.2)",
                border: isCurrent ? "2px solid #667eea" : "none",
                zIndex: 2,
                boxShadow: isCurrent ? "0 0 8px rgba(102,126,234,0.8)" : "none",
              }} />
            );
          })}
          {/* Progress fill */}
          <div style={{
            position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 3,
            background: "linear-gradient(90deg,#667eea,#764ba2)",
            width: `${(liveData.currentStopIndex / (bus.stops.length - 1)) * 100}%`,
            transition: "width 1s ease",
          }} />
        </div>
        {/* Stop names below */}
        <div style={{ position: "relative", height: 18, marginTop: 4 }}>
          {bus.stops.map((stop, idx) => {
            const pct = (idx / (bus.stops.length - 1)) * 100;
            const show = stop === fromStop || stop === toStop || idx === liveData.currentStopIndex || idx === 0 || idx === bus.stops.length - 1;
            if (!show) return null;
            return (
              <div key={stop} style={{
                position: "absolute", left: `${pct}%`, transform: "translateX(-50%)",
                fontSize: 9, color: stop === fromStop ? "#38ef7d" : stop === toStop ? "#f5576c" : idx === liveData.currentStopIndex ? "#fff" : "#64748b",
                whiteSpace: "nowrap", fontWeight: stop === fromStop || stop === toStop ? 700 : 400,
              }}>{stop}</div>
            );
          })}
        </div>
      </div>

      {/* Live Status Row */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 10, marginTop: 14,
        background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "10px 14px",
      }}>
        {/* Current position */}
        <div>
          <div style={{ ...S.label, fontSize: 10 }}>📍 {t.currentStop}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{currentStopName}</div>
        </div>
        {/* Next stop */}
        <div>
          <div style={{ ...S.label, fontSize: 10 }}>➡️ {t.nextStop}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#667eea" }}>{nextStopName}</div>
        </div>
        {/* Speed */}
        <div>
          <div style={{ ...S.label, fontSize: 10 }}>⚡ {t.speed}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#f6ad55" }}>{liveData.speed} {t.kmh}</div>
        </div>
        {/* Status */}
        <div>
          <div style={{ ...S.label, fontSize: 10 }}>🟢 {t.busStatus}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: statusColor }}>{statusText}</div>
        </div>
      </div>

      {/* ETA for YOUR stop */}
      {!busPassed && fromIdx > liveData.currentStopIndex && (
        <div style={{
          marginTop: 10, background: "rgba(102,126,234,0.1)",
          border: "1px solid rgba(102,126,234,0.2)", borderRadius: 8, padding: "10px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>🕐 {t.reachesYourStop} <b style={{ color: "#e2e8f0" }}>{fromStop}</b></div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#667eea", marginTop: 2 }}>
              {eta}
              {minsLeft > 0 && <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>({minsLeft} {t.mins})</span>}
            </div>
          </div>
          <div style={{
            ...S.badge("#667eea"), fontSize: 10, padding: "4px 10px",
            animation: "pulse 2s infinite",
          }}>
            🔴 {t.liveTracking}
          </div>
        </div>
      )}

      {busPassed && (
        <div style={{
          marginTop: 10, background: "rgba(100,116,139,0.1)",
          border: "1px solid rgba(100,116,139,0.2)", borderRadius: 8, padding: "10px 14px",
        }}>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>✅ Bus already passed {fromStop}</span>
        </div>
      )}

      {/* Depart / Arrive timing */}
      <div style={{ ...S.flex(20), marginTop: 12, flexWrap: "wrap" }}>
        <div>
          <div style={S.label}>{t.departs} ({fromStop})</div>
          <b style={{ color: "#38ef7d" }}>{getStopETA(bus, fromIdx, -1, liveData.delayMins) === "Passed" ? bus.timings[fromIdx] : getStopETA(bus, fromIdx, -1, liveData.delayMins)}</b>
        </div>
        <div style={{ color: "#667eea", fontSize: 18 }}>→</div>
        <div>
          <div style={S.label}>{t.arrives} ({toStop})</div>
          <b>{bus.timings[toIdx]}</b>
        </div>
        <div>
          <div style={S.label}>{t.totalDistance}</div>
          <b>{Math.round(bus.total_km * (toIdx - fromIdx) / (bus.stops.length - 1))} km</b>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button style={{ ...S.btn.primary, padding: "10px 22px" }} onClick={() => onBook(bus, fromStop, toStop, fare)}>
            🎫 {t.bookNow}
          </button>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}`}</style>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ user, page, setPage, lang, setLang, t }) {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = user
    ? ["dashboard", "bookTicket", "trackBus", "payment", "feedback"]
    : [];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(7,13,26,0.95)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
    }}>
      <div style={{ ...S.container, ...S.flexBetween, padding: "12px 20px", flexWrap: "wrap", gap: 8 }}>
        <div style={{ ...S.flex(10), cursor: "pointer" }} onClick={() => setPage(user ? "dashboard" : "home")}>
          <span style={{ fontSize: 26 }}>🚌</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#667eea" }}>{t.appName}</div>
            <div style={{ fontSize: 9, color: "#64748b", letterSpacing: 1 }}>{t.tagline.toUpperCase()}</div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ ...S.flex(6), flexWrap: "wrap" }}>
          {navItems.map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              background: page === p ? "rgba(102,126,234,0.18)" : "transparent",
              color: page === p ? "#667eea" : "#94a3b8",
              border: page === p ? "1px solid rgba(102,126,234,0.35)" : "1px solid transparent",
              borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontWeight: 600,
            }}>{t[p]}</button>
          ))}
          {!user && (
            <>
              <button style={{ ...S.btn.secondary, padding: "7px 18px", fontSize: 13 }} onClick={() => setPage("login")}>{t.login}</button>
              <button style={{ ...S.btn.primary, padding: "7px 18px", fontSize: 13 }} onClick={() => setPage("register")}>{t.register}</button>
            </>
          )}

          {/* Language Picker */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(!langOpen)} style={{ ...S.btn.secondary, padding: "7px 12px", fontSize: 13 }}>
              🌐 {TRANSLATIONS[lang].flag} <span style={{ fontSize: 11, marginLeft: 4 }}>{TRANSLATIONS[lang].name}</span>
            </button>
            {langOpen && (
              <div style={{
                position: "absolute", right: 0, top: "110%", background: "#0d1526",
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 8,
                minWidth: 170, zIndex: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}>
                {Object.entries(TRANSLATIONS).map(([code, tr]) => (
                  <div key={code} onClick={() => { setLang(code); setLangOpen(false); }}
                    style={{
                      padding: "9px 14px", borderRadius: 8, cursor: "pointer",
                      background: lang === code ? "rgba(102,126,234,0.2)" : "transparent",
                      color: lang === code ? "#667eea" : "#e2e8f0", fontSize: 13,
                      display: "flex", gap: 10, alignItems: "center", fontWeight: lang === code ? 700 : 400,
                    }}>
                    <span style={{ fontSize: 18 }}>{tr.flag}</span> {tr.name}
                    {lang === code && <span style={{ marginLeft: "auto" }}>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {user && (
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg,#667eea,#764ba2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 13, cursor: "pointer",
            }} title={user.name}>
              {user.name?.[0]?.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage, t }) {
  const features = [
    { icon: "🎫", title: t.featInstant, desc: t.featInstantDesc, color: "#667eea" },
    { icon: "💳", title: t.featDigital, desc: t.featDigitalDesc, color: "#38ef7d" },
    { icon: "🗺️", title: t.featTrack, desc: t.featTrackDesc, color: "#f6ad55" },
    { icon: "⭐", title: t.featFeedback, desc: t.featFeedbackDesc, color: "#f093fb" },
  ];

  return (
    <div>
      <div style={{
        minHeight: "86vh", display: "flex", alignItems: "center",
        background: "radial-gradient(ellipse at 20% 50%, rgba(102,126,234,0.12) 0%, transparent 60%)",
      }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: "fixed", fontSize: 60 + i * 10, opacity: 0.02,
            top: `${15 + i * 18}%`, right: `${3 + i * 7}%`, userSelect: "none", pointerEvents: "none",
          }}>🚌</div>
        ))}
        <div style={{ ...S.container, textAlign: "center" }}>
          <div style={{ ...S.badge("#667eea"), display: "inline-flex", marginBottom: 20, gap: 6 }}>
            🌾 Rural Smart Transport System
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, margin: "0 0 16px" }}>
            {t.heroTitle}<br />
            <span style={{ background: "linear-gradient(135deg,#667eea,#f093fb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t.heroTitleAccent}
            </span>
          </h1>
          <p style={{ ...S.sub, fontSize: 17, maxWidth: 500, margin: "0 auto 36px" }}>{t.heroSub}</p>
          <div style={{ ...S.flex(14), justifyContent: "center" }}>
            <button style={{ ...S.btn.primary, padding: "14px 36px", fontSize: 16 }} onClick={() => setPage("register")}>
              {t.getStarted} →
            </button>
            <button style={{ ...S.btn.secondary, padding: "14px 36px", fontSize: 16 }} onClick={() => setPage("login")}>
              {t.login}
            </button>
          </div>
          <div style={{ ...S.flex(36), justifyContent: "center", marginTop: 52, flexWrap: "wrap" }}>
            {[["6 States", "Covered"], ["500+", "Villages"], ["₹0", "Change Needed"], ["Live", "Bus Tracking"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#667eea" }}>{v}</div>
                <div style={{ ...S.sub, fontSize: 12 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...S.container, padding: "60px 20px" }}>
        <h2 style={{ ...S.h2, textAlign: "center", marginBottom: 36 }}>{t.features}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {features.map(f => (
            <div key={f.title} style={{ ...S.card, textAlign: "center", borderTop: `2px solid ${f.color}` }}>
              <div style={{ fontSize: 38, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ ...S.h4, color: f.color, marginBottom: 8 }}>{f.title}</div>
              <p style={{ ...S.sub, fontSize: 13, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthPage({ mode, setPage, onLogin, t }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", otp: "" });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const handleSendOtp = () => {
    if (!form.email) return setError("Please enter email or mobile");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); setError(""); }, 1000);
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) return setError("Fill all fields");
    if (!isLogin && !form.name) return setError("Enter your name");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: form.name || form.email.split("@")[0] || "User", email: form.email });
    }, 1200);
  };

  return (
    <div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ ...S.card, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>🚌</div>
          <h2 style={S.h2}>{isLogin ? t.loginTitle : t.registerTitle}</h2>
          <p style={{ ...S.sub, marginTop: 6, fontSize: 13 }}>
            {isLogin ? `${t.noAccount} ` : `${t.hasAccount} `}
            <span style={{ color: "#667eea", cursor: "pointer", fontWeight: 700 }}
              onClick={() => setPage(isLogin ? "register" : "login")}>
              {isLogin ? t.register : t.login}
            </span>
          </p>
        </div>
        {error && <div style={{ background: "rgba(245,87,108,0.12)", border: "1px solid rgba(245,87,108,0.3)", borderRadius: 8, padding: "9px 14px", marginBottom: 16, color: "#f5576c", fontSize: 13 }}>⚠️ {error}</div>}
        <div style={S.flexCol(14)}>
          {!isLogin && <div><label style={S.label}>{t.name}</label><input style={S.input} placeholder="Raju Kumar" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>}
          <div><label style={S.label}>{t.email}</label><input style={S.input} placeholder="user@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
          <div><label style={S.label}>{t.password}</label><input style={S.input} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
          {!isLogin && step === 1 && <button style={{ ...S.btn.secondary, width: "100%" }} onClick={handleSendOtp} disabled={loading}>{loading ? "..." : t.sendOtp}</button>}
          {(!isLogin && step === 2) && <div><label style={S.label}>{t.otp}</label><input style={S.input} placeholder="6-digit OTP (demo: any)" value={form.otp} onChange={e => setForm({ ...form, otp: e.target.value })} /></div>}
          {(isLogin || step === 2) && <button style={{ ...S.btn.primary, width: "100%", padding: 13 }} onClick={handleSubmit} disabled={loading}>{loading ? "⏳ " + t.processingPayment : isLogin ? t.loginBtn : t.registerBtn}</button>}
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, setPage, tickets, t }) {
  const actions = [
    { key: "bookTicket", icon: "🎫", color: "#667eea", desc: "Find & book seats" },
    { key: "trackBus", icon: "🗺️", color: "#38ef7d", desc: "Live bus location" },
    { key: "payment", icon: "💳", color: "#f6ad55", desc: "Pay digitally" },
    { key: "feedback", icon: "⭐", color: "#f093fb", desc: "Share experience" },
  ];
  return (
    <div style={{ ...S.container, padding: "36px 20px" }}>
      <div style={{
        ...S.card, marginBottom: 28,
        background: "linear-gradient(135deg,rgba(102,126,234,0.15),rgba(118,75,162,0.1))",
        border: "1px solid rgba(102,126,234,0.25)",
      }}>
        <div style={S.flexBetween}>
          <div>
            <h2 style={S.h2}>{t.welcome}, {user.name}! 👋</h2>
            <p style={{ ...S.sub, marginTop: 6 }}>{tickets.filter(x => x.status === "active").length} active journey</p>
          </div>
          <span style={{ fontSize: 52 }}>🚌</span>
        </div>
      </div>
      <h3 style={{ ...S.h3, marginBottom: 16 }}>{t.quickActions}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 28 }}>
        {actions.map(a => (
          <div key={a.key} onClick={() => setPage(a.key)} style={{
            ...S.card, cursor: "pointer", borderTop: `2px solid ${a.color}`,
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{a.icon}</div>
            <div style={{ ...S.h4, color: a.color }}>{t[a.key]}</div>
            <div style={{ ...S.sub, fontSize: 12, marginTop: 4 }}>{a.desc}</div>
          </div>
        ))}
      </div>
      {tickets.length > 0 && (
        <>
          <h3 style={{ ...S.h3, marginBottom: 14 }}>{t.myTickets}</h3>
          <div style={S.flexCol(10)}>
            {tickets.map(tk => (
              <div key={tk.id} style={{ ...S.card, borderLeft: `3px solid ${tk.status === "active" ? "#38ef7d" : "#94a3b8"}` }}>
                <div style={S.flexBetween}>
                  <div style={S.flex(8)}>
                    <span style={{ fontSize: 20 }}>🎫</span>
                    <div>
                      <div style={S.h4}>{tk.busName}</div>
                      <div style={{ ...S.sub, fontSize: 12 }}>{tk.from} → {tk.to} • {tk.id}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "#38ef7d" }}>₹{tk.fare}</div>
                    <span style={S.badge(tk.status === "active" ? "#38ef7d" : "#94a3b8")}>{t[tk.status]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── BOOKING PAGE (with live bus status in results) ────────────────────────────
function BookingPage({ user, addTicket, setPage, t }) {
  const [search, setSearch] = useState({ from: "", to: "", date: new Date().toISOString().split("T")[0] });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(null);

  const handleSearch = () => {
    if (!search.from || !search.to) return;
    if (search.from === search.to) return;
    setLoading(true);
    setTimeout(() => {
      // Find buses where both from and to are stops, and from comes before to
      const matched = RURAL_BUSES.filter(bus => {
        const fi = bus.stops.indexOf(search.from);
        const ti = bus.stops.indexOf(search.to);
        return fi !== -1 && ti !== -1 && fi < ti;
      });
      setResults(matched);
      setLoading(false);
    }, 900);
  };

  const handleBook = (bus, fromStop, toStop, fare) => {
    const ticket = {
      id: `TKT${Date.now()}`, busName: bus.name, from: fromStop, to: toStop,
      departs: bus.timings[bus.stops.indexOf(fromStop)],
      arrives: bus.timings[bus.stops.indexOf(toStop)],
      fare, class: bus.type, status: "active",
      date: search.date, passenger: user.name, busId: bus.id,
    };
    addTicket(ticket);
    setBooked(ticket);
  };

  if (booked) return (
    <div style={{ ...S.container, padding: "60px 20px", maxWidth: 520, textAlign: "center" }}>
      <div style={{ fontSize: 72 }}>🎫</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#38ef7d", margin: "16px 0 8px" }}>{t.ticketConfirmed}</h2>
      <div style={{ ...S.card, textAlign: "left", marginTop: 20 }}>
        <div style={S.flexBetween}>
          <div>
            <div style={S.label}>{t.ticketId}</div>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#667eea" }}>{booked.id}</div>
          </div>
          <span style={S.badge("#38ef7d")}>{t.active}</span>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 14, paddingTop: 14 }}>
          {[[t.passenger, booked.passenger], [t.busName, booked.busName], [t.from, booked.from],
            [t.to, booked.to], [t.departs, booked.departs], [t.arrives, booked.arrives],
            [t.fare, `₹${booked.fare}`]].map(([l, v]) => (
            <div key={l} style={{ ...S.flexBetween, marginBottom: 10 }}>
              <span style={S.label}>{l}</span>
              <span style={{ fontWeight: 600, color: l === t.fare ? "#38ef7d" : "#e2e8f0" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...S.flex(12), justifyContent: "center", marginTop: 20 }}>
        <button style={S.btn.primary} onClick={() => setPage("payment")}>💳 {t.payNow}</button>
        <button style={S.btn.secondary} onClick={() => { setBooked(null); setResults(null); }}>+ Book Another</button>
      </div>
    </div>
  );

  return (
    <div style={{ ...S.container, padding: "36px 20px" }}>
      <h2 style={{ ...S.h2, marginBottom: 6 }}>{t.bookTicket}</h2>
      <p style={{ ...S.sub, marginBottom: 24 }}>{t.villageRoute} • {t.shortDistance}</p>

      {/* Search Form */}
      <div style={{ ...S.card, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div>
            <label style={S.label}>🏘️ {t.from}</label>
            <select style={S.select} value={search.from} onChange={e => setSearch({ ...search, from: e.target.value })}>
              <option value="">-- Select Stop --</option>
              {ALL_STOPS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>📍 {t.to}</label>
            <select style={S.select} value={search.to} onChange={e => setSearch({ ...search, to: e.target.value })}>
              <option value="">-- Select Stop --</option>
              {ALL_STOPS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>📅 {t.date}</label>
            <input type="date" style={S.input} value={search.date} onChange={e => setSearch({ ...search, date: e.target.value })} />
          </div>
        </div>
        <button style={{ ...S.btn.primary, padding: "11px 28px" }} onClick={handleSearch}>
          🔍 {t.searchBuses}
        </button>

        {/* Quick route suggestions */}
        <div style={{ marginTop: 14 }}>
          <div style={{ ...S.label, marginBottom: 8 }}>Popular short routes:</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[["Mysuru", "Mandya"], ["Hubballi", "Gadag"], ["Mangaluru", "Udupi"], ["Coimbatore", "Ooty"], ["Pune", "Lonavala"]].map(([f, to]) => (
              <button key={f + to} style={{ ...S.btn.secondary, padding: "5px 12px", fontSize: 12 }}
                onClick={() => { setSearch(prev => ({ ...prev, from: f, to })); }}>
                {f} → {to}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && <Loader />}

      {/* Results with Live Status */}
      {results !== null && !loading && (
        <>
          <div style={{ ...S.flexBetween, marginBottom: 16 }}>
            <h3 style={S.h3}>
              {results.length > 0 ? `${t.availableBuses} (${results.length})` : "No buses found"}
            </h3>
            {results.length > 0 && (
              <div style={{ ...S.badge("#38ef7d"), ...S.flex(6) }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#38ef7d", display: "inline-block", animation: "pulse 1.5s infinite" }} />
                {t.liveTracking} Updates
              </div>
            )}
          </div>

          {results.length === 0 && (
            <div style={{ ...S.card, textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🔍</div>
              <h3 style={S.h3}>No direct buses</h3>
              <p style={{ ...S.sub, marginTop: 8 }}>Try different stops or check nearby routes</p>
              <div style={{ marginTop: 16 }}>
                <div style={S.label}>All available stops:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, justifyContent: "center" }}>
                  {ALL_STOPS.map(s => <span key={s} style={{ ...S.badge("#667eea"), fontSize: 11 }}>{s}</span>)}
                </div>
              </div>
            </div>
          )}

          <div style={S.flexCol(16)}>
            {results.map(bus => (
              <LiveBusStatusCard
                key={bus.id} bus={bus}
                fromStop={search.from} toStop={search.to}
                onBook={handleBook} t={t}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── TRACKING PAGE ────────────────────────────────────────────────────────────
function TrackingPage({ t }) {
  const [selected, setSelected] = useState(RURAL_BUSES[0]);
  const [livePos, setLivePos] = useState({ stopProgress: 0.4, speed: 52, delay: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const iv = setInterval(() => {
      setLivePos(prev => ({
        stopProgress: Math.min(1, prev.stopProgress + 0.005),
        speed: Math.max(20, Math.min(75, prev.speed + Math.floor((Math.random() - 0.5) * 6))),
        delay: Math.max(0, prev.delay + (Math.random() > 0.85 ? 1 : 0)),
      }));
    }, 2000);
    return () => clearInterval(iv);
  }, [selected]);

  useEffect(() => {
    setLivePos({ stopProgress: 0.3 + Math.random() * 0.4, speed: 45 + Math.floor(Math.random() * 25), delay: selected.delayMins });
  }, [selected]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#0a1020";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(102,126,234,0.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i < W; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
    for (let i = 0; i < H; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke(); }

    const stops = selected.stops;
    const n = stops.length;
    const padding = 60;
    const stopX = (i) => padding + (i / (n - 1)) * (W - 2 * padding);
    const stopY = H / 2 + Math.sin(i => i * 0.8) * 30;

    // Draw road
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 20;
    for (let i = 0; i < n; i++) {
      const x = stopX(i), y = H / 2 + Math.sin(i * 1.2) * 25;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Route line
    ctx.beginPath();
    ctx.setLineDash([8, 5]);
    ctx.strokeStyle = "rgba(102,126,234,0.3)";
    ctx.lineWidth = 2;
    for (let i = 0; i < n; i++) {
      const x = stopX(i), y = H / 2 + Math.sin(i * 1.2) * 25;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Progress line (traveled portion)
    const busAbsPos = livePos.stopProgress * (n - 1);
    const busStopI = Math.floor(busAbsPos);
    const frac = busAbsPos - busStopI;

    ctx.beginPath();
    ctx.strokeStyle = "#667eea";
    ctx.lineWidth = 3;
    for (let i = 0; i <= Math.min(busStopI, n - 1); i++) {
      const x = stopX(i), y = H / 2 + Math.sin(i * 1.2) * 25;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw stop circles
    for (let i = 0; i < n; i++) {
      const x = stopX(i), y = H / 2 + Math.sin(i * 1.2) * 25;
      const isPassed = i < busStopI || (i === busStopI && frac > 0.5);
      const isCurrent = Math.abs(i - busAbsPos) < 0.6;

      ctx.beginPath();
      ctx.arc(x, y, isCurrent ? 9 : 6, 0, Math.PI * 2);
      ctx.fillStyle = isPassed ? "#667eea" : isCurrent ? "#fff" : "rgba(255,255,255,0.15)";
      ctx.fill();
      if (isCurrent) {
        ctx.strokeStyle = "#667eea"; ctx.lineWidth = 2; ctx.stroke();
        // Pulse
        ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(102,126,234,0.4)"; ctx.lineWidth = 2; ctx.stroke();
      }

      // Stop name
      ctx.fillStyle = isCurrent ? "#fff" : isPassed ? "#667eea" : "#64748b";
      ctx.font = `${isCurrent ? "bold " : ""}11px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(stops[i], x, y + (i % 2 === 0 ? 24 : -16));
    }

    // Bus icon position
    const bx = busStopI < n - 1
      ? stopX(busStopI) + frac * (stopX(busStopI + 1) - stopX(busStopI))
      : stopX(n - 1);
    const by = H / 2 + Math.sin(busAbsPos * 1.2) * 25;

    // Bus shadow
    ctx.beginPath(); ctx.arc(bx, by, 18, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(102,126,234,0.2)"; ctx.fill();
    ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#667eea"; ctx.fill();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();

    // Bus emoji
    ctx.font = "16px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("🚌", bx, by);

    // Info box
    ctx.fillStyle = "rgba(10,16,32,0.92)";
    ctx.beginPath();
    const bx2 = Math.max(50, Math.min(W - 90, bx - 50));
    ctx.roundRect(bx2, by - 50, 100, 24, 6);
    ctx.fill();
    ctx.fillStyle = "#e2e8f0"; ctx.font = "bold 10px sans-serif"; ctx.textBaseline = "middle";
    ctx.fillText(`${livePos.speed} km/h${livePos.delay > 0 ? ` (+${livePos.delay}m)` : " ✓"}`, bx2 + 50, by - 38);

  }, [livePos, selected]);

  const currentStop = selected.stops[Math.min(Math.floor(livePos.stopProgress * (selected.stops.length - 1)), selected.stops.length - 1)];
  const nextStopI = Math.min(Math.ceil(livePos.stopProgress * (selected.stops.length - 1)), selected.stops.length - 1);
  const nextStop = selected.stops[nextStopI];

  return (
    <div style={{ ...S.container, padding: "36px 20px" }}>
      <h2 style={{ ...S.h2, marginBottom: 6 }}>{t.busLocation}</h2>
      <p style={{ ...S.sub, marginBottom: 20 }}>{t.lastUpdated}: <b style={{ color: "#38ef7d" }}>Just now</b> 🟢</p>

      {/* Bus selector */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {RURAL_BUSES.map(b => (
          <button key={b.id} onClick={() => setSelected(b)} style={{
            padding: "7px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: 600,
            background: selected.id === b.id ? "rgba(102,126,234,0.2)" : "rgba(255,255,255,0.04)",
            border: selected.id === b.id ? "1px solid #667eea" : "1px solid rgba(255,255,255,0.1)",
            color: selected.id === b.id ? "#667eea" : "#94a3b8",
          }}>
            🚌 {b.id} <span style={{ fontSize: 10, opacity: 0.7 }}>({b.type})</span>
          </button>
        ))}
      </div>

      <div style={{ ...S.card, padding: 0, overflow: "hidden", marginBottom: 20 }}>
        <canvas ref={canvasRef} width={900} height={260} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* Live stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
        {[
          { label: t.busNo, value: selected.id, color: "#667eea", icon: "🚌" },
          { label: t.currentStop, value: currentStop, color: "#f6ad55", icon: "📍" },
          { label: t.nextStop, value: nextStop, color: "#667eea", icon: "➡️" },
          { label: t.speed, value: `${livePos.speed} ${t.kmh}`, color: "#38ef7d", icon: "⚡" },
          { label: t.busStatus, value: livePos.delay > 0 ? `${livePos.delay} ${t.minutesLate}` : t.busOnTime, color: livePos.delay > 0 ? "#f6ad55" : "#38ef7d", icon: "🕐" },
          { label: t.totalDistance, value: `${selected.total_km} km`, color: "#f093fb", icon: "🛣️" },
        ].map(s => (
          <div key={s.label} style={{ ...S.card, textAlign: "center", padding: 14 }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4, fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontWeight: 700, color: s.color, fontSize: 14 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Route stops list */}
      <div style={{ ...S.card, marginTop: 20 }}>
        <h3 style={{ ...S.h3, marginBottom: 14 }}>Route Stops — {selected.name}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
          {selected.stops.map((stop, i) => {
            const busPos = livePos.stopProgress * (selected.stops.length - 1);
            const isPassed = i < busPos;
            const isCurrent = Math.abs(i - busPos) < 0.6;
            const eta = getStopETA(selected, i, Math.floor(busPos), livePos.delay);
            return (
              <div key={stop} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ textAlign: "center", padding: "6px 4px", minWidth: 90 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", margin: "0 auto 4px",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
                    background: isCurrent ? "#667eea" : isPassed ? "rgba(102,126,234,0.3)" : "rgba(255,255,255,0.07)",
                    border: isCurrent ? "2px solid #667eea" : "2px solid rgba(255,255,255,0.1)",
                    color: isCurrent ? "#fff" : isPassed ? "#667eea" : "#64748b",
                    fontWeight: 700,
                  }}>
                    {isCurrent ? "🚌" : i + 1}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: isCurrent ? 700 : 400, color: isCurrent ? "#fff" : isPassed ? "#667eea" : "#64748b" }}>{stop}</div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>{eta}</div>
                </div>
                {i < selected.stops.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: i < busPos ? "#667eea" : "rgba(255,255,255,0.07)", minWidth: 16 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── PAYMENT PAGE ─────────────────────────────────────────────────────────────
function PaymentPage({ tickets, t }) {
  const [method, setMethod] = useState("upi");
  const [status, setStatus] = useState(null);
  const [amount, setAmount] = useState("120");
  const [conductorMode, setConductorMode] = useState(false);

  const handlePay = () => {
    setStatus("processing");
    setTimeout(() => setStatus(Math.random() > 0.1 ? "success" : "fail"), 2000);
  };

  if (status === "success") return (
    <div style={{ ...S.container, padding: "70px 20px", maxWidth: 440, textAlign: "center" }}>
      <div style={{ fontSize: 72 }}>✅</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#38ef7d", margin: "16px 0 8px" }}>{t.paymentSuccess}</h2>
      <p style={S.sub}>Txn: TXN{Date.now()} • ₹{amount} paid</p>
      <button style={{ ...S.btn.primary, marginTop: 24 }} onClick={() => setStatus(null)}>Done</button>
    </div>
  );

  if (status === "fail") return (
    <div style={{ ...S.container, padding: "70px 20px", maxWidth: 440, textAlign: "center" }}>
      <div style={{ fontSize: 72 }}>❌</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#f5576c", margin: "16px 0 8px" }}>{t.paymentFail}</h2>
      <button style={{ ...S.btn.primary, marginTop: 24 }} onClick={() => setStatus(null)}>Try Again</button>
    </div>
  );

  return (
    <div style={{ ...S.container, padding: "36px 20px", maxWidth: 520 }}>
      <h2 style={{ ...S.h2, marginBottom: 6 }}>{t.payment}</h2>
      <p style={{ ...S.sub, marginBottom: 24 }}>No change needed — pay digitally!</p>

      <div style={{ ...S.flex(0), marginBottom: 24, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4 }}>
        {[[false, `💳 ${t.payNow}`], [true, `📱 ${t.payToConductor}`]].map(([cm, lbl]) => (
          <button key={String(cm)} onClick={() => setConductorMode(cm)} style={{
            flex: 1, padding: "9px 14px", borderRadius: 8, border: "none", cursor: "pointer",
            background: conductorMode === cm ? "linear-gradient(135deg,#667eea,#764ba2)" : "transparent",
            color: conductorMode === cm ? "#fff" : "#94a3b8", fontWeight: 700, fontSize: 13,
          }}>{lbl}</button>
        ))}
      </div>

      {conductorMode ? (
        <div style={{ ...S.card, textAlign: "center" }}>
          <h3 style={{ ...S.h3, marginBottom: 6 }}>{t.scanQr}</h3>
          <p style={{ ...S.sub, fontSize: 12, marginBottom: 20 }}>Show this QR to your conductor</p>
          <div style={{
            width: 150, height: 150, margin: "0 auto 16px",
            background: "#fff", borderRadius: 10, padding: 10,
            display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2,
          }}>
            {Array.from({ length: 49 }).map((_, i) => (
              <div key={i} style={{ background: (i % 3 === 0 || i % 7 === 0 || [0, 6, 42, 48].includes(i)) ? "#000" : "#fff", borderRadius: 1 }} />
            ))}
          </div>
          <div style={{ color: "#667eea", fontWeight: 700, fontSize: 16 }}>conductor@busgo</div>
          <div style={{ ...S.badge("#38ef7d"), display: "inline-block", marginTop: 12 }}>🔒 Secure Payment</div>
        </div>
      ) : (
        <div style={S.card}>
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>{t.amount} (₹)</label>
            <input style={{ ...S.input, fontSize: 22, fontWeight: 800 }} type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          {tickets.length > 0 && (
            <div style={{ ...S.flex(8), marginBottom: 16, flexWrap: "wrap" }}>
              {tickets.slice(0, 3).map(tk => (
                <button key={tk.id} style={{ ...S.btn.secondary, padding: "5px 12px", fontSize: 12 }} onClick={() => setAmount(String(tk.fare))}>
                  {tk.from}→{tk.to}: ₹{tk.fare}
                </button>
              ))}
            </div>
          )}
          <div style={S.flexCol(8)}>
            {[["📲", "UPI / QR Code", "upi"], ["💳", "Card", "card"], ["🏦", "Net Banking", "netbanking"], ["💰", "Wallet", "wallet"]].map(([ic, lb, key]) => (
              <div key={key} onClick={() => setMethod(key)} style={{
                ...S.flex(12), padding: "10px 14px", borderRadius: 8, cursor: "pointer",
                background: method === key ? "rgba(102,126,234,0.12)" : "rgba(255,255,255,0.03)",
                border: method === key ? "1px solid rgba(102,126,234,0.4)" : "1px solid rgba(255,255,255,0.07)",
              }}>
                <span style={{ fontSize: 18 }}>{ic}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{lb}</span>
                {method === key && <span style={{ marginLeft: "auto", color: "#667eea" }}>✓</span>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            {status === "processing"
              ? <div style={{ textAlign: "center" }}><Loader /><p style={S.sub}>{t.processingPayment}</p></div>
              : <button style={{ ...S.btn.success, width: "100%", padding: 13, fontSize: 16 }} onClick={handlePay}>🔐 {t.payNow} — ₹{amount}</button>
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FEEDBACK PAGE ────────────────────────────────────────────────────────────
function FeedbackPage({ user, feedbacks, addFeedback, t }) {
  const [form, setForm] = useState({ rating: 0, msg: "" });
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!form.rating || !form.msg) return;
    addFeedback({ id: Date.now(), user: user.name, rating: form.rating, msg: form.msg, time: "Just now" });
    setForm({ rating: 0, msg: "" });
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <div style={{ ...S.container, padding: "36px 20px" }}>
      <h2 style={{ ...S.h2, marginBottom: 6 }}>{t.yourFeedback}</h2>
      <p style={{ ...S.sub, marginBottom: 24 }}>Help improve rural bus services</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        <div style={S.card}>
          <h3 style={{ ...S.h3, marginBottom: 20 }}>Share Your Experience</h3>
          {done && <div style={{ background: "rgba(56,239,125,0.1)", border: "1px solid rgba(56,239,125,0.25)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#38ef7d", fontWeight: 600 }}>✅ {t.thanksFeedback}</div>}
          <div style={S.flexCol(16)}>
            <div>
              <label style={S.label}>{t.rating}</label>
              <div style={S.flex(6)}>
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} onClick={() => setForm({ ...form, rating: s })}
                    style={{ fontSize: 28, cursor: "pointer", color: s <= form.rating ? "#f6ad55" : "rgba(255,255,255,0.15)" }}>★</span>
                ))}
              </div>
            </div>
            <div>
              <label style={S.label}>{t.feedbackMsg}</label>
              <textarea style={{ ...S.input, minHeight: 110, resize: "vertical" }}
                placeholder="Share your experience..."
                value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
            </div>
            <button style={S.btn.primary} onClick={submit}>{t.submitFeedback}</button>
          </div>
        </div>
        <div>
          <h3 style={{ ...S.h3, marginBottom: 16 }}>{t.recentFeedback}</h3>
          <div style={S.flexCol(10)}>
            {feedbacks.map(fb => (
              <div key={fb.id} style={S.card}>
                <div style={S.flexBetween}>
                  <div style={S.flex(8)}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#667eea,#764ba2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{fb.user[0]}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{fb.user}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{fb.time}</div>
                    </div>
                  </div>
                  <div style={{ color: "#f6ad55", fontSize: 14 }}>{"★".repeat(fb.rating)}</div>
                </div>
                <p style={{ ...S.sub, fontSize: 13, marginTop: 10, lineHeight: 1.5 }}>{fb.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [feedbacks, setFeedbacks] = useState(SAMPLE_FEEDBACKS);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ar";

  return (
    <div style={{ ...S.page, direction: isRTL ? "rtl" : "ltr" }}>
      <style>{`
        *{box-sizing:border-box}
        body{margin:0}
        input::placeholder,textarea::placeholder{color:#4a5568 !important}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#070d1a}
        ::-webkit-scrollbar-thumb{background:#667eea55;border-radius:3px}
        button:hover{opacity:0.88}
      `}</style>

      <Navbar user={user} page={page} setPage={setPage} lang={lang} setLang={setLang} t={t} />

      <main>
        {page === "home" && <HomePage setPage={setPage} t={t} />}
        {page === "login" && <AuthPage mode="login" setPage={setPage} onLogin={u => { setUser(u); setPage("dashboard"); }} t={t} />}
        {page === "register" && <AuthPage mode="register" setPage={setPage} onLogin={u => { setUser(u); setPage("dashboard"); }} t={t} />}
        {page === "dashboard" && user && <Dashboard user={user} setPage={setPage} tickets={tickets} t={t} />}
        {page === "bookTicket" && user && <BookingPage user={user} addTicket={tk => setTickets(p => [tk, ...p])} setPage={setPage} t={t} />}
        {page === "trackBus" && user && <TrackingPage t={t} />}
        {page === "payment" && user && <PaymentPage tickets={tickets} t={t} />}
        {page === "feedback" && user && <FeedbackPage user={user} feedbacks={feedbacks} addFeedback={fb => setFeedbacks(p => [fb, ...p])} t={t} />}

        {["dashboard", "bookTicket", "trackBus", "payment", "feedback"].includes(page) && !user && (
          <div style={{ ...S.container, padding: "70px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 56 }}>🔒</div>
            <h2 style={{ ...S.h2, margin: "16px 0 8px" }}>Login Required</h2>
            <p style={{ ...S.sub, marginBottom: 20 }}>Please login to access this page</p>
            <button style={S.btn.primary} onClick={() => setPage("login")}>{t.loginBtn}</button>
          </div>
        )}
      </main>

      {user && (
        <button onClick={() => { setUser(null); setPage("home"); }} title={t.logout} style={{
          position: "fixed", bottom: 20, right: 20, width: 46, height: 46,
          background: "rgba(245,87,108,0.12)", border: "1px solid rgba(245,87,108,0.3)",
          color: "#f5576c", borderRadius: "50%", fontSize: 18, cursor: "pointer", zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}>🚪</button>
      )}

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 20px", textAlign: "center" }}>
        <div style={{ ...S.flex(8), justifyContent: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>🚌</span>
          <span style={{ fontWeight: 800, color: "#667eea" }}>{t.appName}</span>
          <span style={{ ...S.badge("#667eea"), fontSize: 10 }}>Rural Edition</span>
        </div>
        <p style={{ ...S.sub, fontSize: 12 }}>Smart Bus Ticketing for Rural India • Hackathon 2025</p>
      </footer>
    </div>
  );
}
