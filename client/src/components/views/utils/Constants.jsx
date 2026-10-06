import { 
    FavoriteBorder, AccessTimeFilled, Church, PhotoCamera, WineBar, Gite, AutoAwesome, Groups, Checkroom
} from '@mui/icons-material';

export const CONTENT = {
    TITLE_NAME: "Jerald <span class='pinyon-script-regular'>&</span> Sheila",
    TITLE_DATE: "Saturday, July 17, 2027 \nat 10:00 AM",
    TITLE_DATE_V2: "July 17, 2027  •  10AM",
    TITLE_DATE_V3: "07 • 17 • 27",
    TITLE_DATE_V4: "July 17, 2027  •  12PM",
    TITLE_CHURCH: "St. Augustine Parish Church",
    TITLE_CHURCH_ADDRESS: "Brgy. Santor 1, Tanauan City, Batangas 4232, Philippines",
    TITLE_RECEPTION: "Casa Lucido Events Place",
    TITLE_RECEPTION_ADDRESS: "356 Hilario H. Atienza St., Poblacion Barangay 7, Tanauan City, Batangas 4232, Philippines",
    TITLE_HASHTAG: "#JerAndShylSayIDo",
    BUTTON_RSVP: "RSVP NOW",
    BUTTON_VIEWMAP: "Get Directions",
    PAGE_TITLE_HOME: "Home",
    PAGE_TITLE_STORY: "Story",
    PAGE_TITLE_WEDDING: "Wedding",
    PAGE_TITLE_ENTOURAGE: "Entourage",
    PAGE_TITLE_ATTIRE: "Attire",
    PAGE_TITLE_FAQ: "FAQ",
    PAGE_TITLE_GIFT: "Gifts",
    PAGE_SUBTITLE_ATTIRE: "Formal Palette",
    PAGE_SUBTITLE_FAQ: "Questions",
    PAGE_SUBTITLE_STORY: "Journey",
    PAGE_SUBTITLE_GIFT: "Blessings",
};

export const CONTENT_FOOTER = {
    TAGLINE: "Since 2016, through all our tomorrows.",
    CRIGHT: "Mahal by J&S • ",
    NAME: {
        GROOM_FN: "Jerald",
        GROOM_MN_LN: "Seña Gutierrez",
        BRIDE_FN: "Sheila",
        BRIDE_MN_LN: "Yuson Bathan"
    }
}

export const CONTENT_ENVELOPE = {
    YOURINVITED: "YOU'RE CORDIALLY INVITED!",
    TOCELEBRATE: "to witness our vows before God",
    WAXSEAL: "Tap the <h2 class='d-inline-block'>Wax Seal</h5> to Open",
    BIBLEVERSE: "And now these three remain: faith, hope and love, \nBut the greatest of these is love.",
    BIBLEVERSE_ID: "— 1 CORINTHIANS 13:13 —",
};

export const CONTENT_HOME = {
    GETTINGMARRIED: "We're Getting Married!",
    QUOTE: "From this day forward, we walk together in His grace.",
    PAGE_TITLE: "Your Guide to Our Wedding",
    PAGE_SUBTITLE: "Everything you need to know, all in one place.",
    ITEM_NAVIGATION: [
        {
            ID: 'story',
            TO: '/story',
            ICON: FavoriteBorder,
            TITLE: CONTENT.PAGE_TITLE_STORY,
            SUBTITLE: "Our journey from where it all began to today."
        },
        {
            ID: 'wedding',
            TO: '/wedding',
            ICON: Church,
            TITLE: CONTENT.PAGE_TITLE_WEDDING,
            SUBTITLE: "Ceremony, reception, venue, and schedule."
        },
        {
            ID: 'entourage',
            TO: '/entourage',
            ICON: Groups,
            TITLE: CONTENT.PAGE_TITLE_ENTOURAGE,
            SUBTITLE: "The family and friends standing beside us."
        },
        {
            ID: 'attire',
            TO: '/attire',
            ICON: Checkroom,
            TITLE: CONTENT.PAGE_TITLE_ATTIRE,
            SUBTITLE: "Dress code, colors, and style inspiration."
        },
    ]
};

export const CONTENT_STORY = {
    TITLE: "Our Story",
    SUBTITLE: "Take a glimpse into our journey as we share the moments, memories, and adventures that brought us to this beautiful chapter.",
    SECTION1_CONTENT_TAGLINE: "A Love that Grew Naturally",
    SECTION1_CONTENT_TITLE: "How We Met",
    SECTION1_CONTENT_SUBTITLE: "From colleagues to lovers, from adventures to forever — this is our story.",
    SECTION1_HIGHLIGHT: "Collecting beautiful moments",
    SECTION1_CHAPTER: [
        {
            ID: '01',
            TITLE: "Where It All Began",
            BODY: "",
        },
        {
            ID: '02',
            TITLE: "Lovers",
            BODY: "",
        },
        {
            ID: '03',
            TITLE: "Adventures",
            BODY: "",
        },
        {
            ID: '04',
            TITLE: "Today",
            BODY: "",
        },
    ],
    SECTION2_PARALLAX_TITLE: "“Two paths crossed, and forever began.”",
    SECTION2_PARALLAX_SUBTITLE: "July 17, 2027",
    SECTION2_GALLERY_TITLE: "Our Favorite Memories",
    SECTION2_GALLERY_SUBTITLE: "A collection of moments captured through the years.",
    SECTION_GALLER_TAB1_TITLE: "Life, Together",
    SECTION_GALLER_TAB2_TITLE: "The Proposal — A Promise Made",
    SECTION_GALLER_TAB3_TITLE: "Prenup Shoot — Moments Before the Vows"
};

export const CONTENT_WEDDING = {
    TITLE: "Our Wedding",
    SUBTITLE: "A closer look at the celebration ahead, from the ceremony to the reception, beautiful venues, and thoughtful details that will make this day truly meaningful.",
    TAB: {
        VENUE_AND_LOCATION: {
            TITLE: "Locations",
            CEREMONY: "Ceremony",
            RECEPTION: "Reception",
            CHURCH_TAGLINE: "Witness us as we enter into the sacred covenant of marriage before God, surrounded by family and friends.",
            RECEPTION_TAGLINE: "Join us after the ceremony for dining, music, heartfelt toasts, and dancing with family and friends.",
            MAP_INFO: "Get Directions"
        },
        DAY_SCHEDULE: {
            TITLE: "Timeline"
        },
    },
    CEREMONY_BEGINS: "10:00 AM\n<span class='fs-8'>Please arrive by 9:30 AM for seating.</span>",
    RECEPTION_BEGINS: "12:00 PM\n<span class='fs-8'>Gather. Dine. Celebrate.</span>",
    TIMELINE_TITLE: "Wedding Schedule",
    TIMELINE_SUBTITLE: "Interactive Day Guide",
    TIMELINE_BODY: [
        {
            ID: 1,
            TITLE: "Arrival & Welcome",
            TIME: '9:30 AM',
            LOCATION: "St. Augustine Parish Church",
            DESCRIPTION: "Guests arrive and assemble at the parish church. Ushering and seating begin.",
            ICON: AccessTimeFilled
        },
        {
            ID: 2,
            TITLE: "Holy Matrimony Vows",
            TIME: "",
            LOCATION: "St. Augustine Parish Church",
            DESCRIPTION: "The solemn nuptial ceremony and exchanging of vows before loved ones and God.",
            ICON: Church
        },
        {
            ID: 3,
            TITLE: "Memorial Photos",
            TIME: "",
            LOCATION: "Church Courtyard",
            DESCRIPTION: "Pictorial session with beloved entourage and family members",
            ICON: PhotoCamera
        },
        {
            ID: 4,
            TITLE: "Grazing & Cocktails",
            TIME: "",
            LOCATION: "Casa Lucido Events Place",
            DESCRIPTION: "Welcome drinks, charcuterie, and refreshing cocktail grazing table.",
            ICON: WineBar
        },
        {
            ID: 5,
            TITLE: "Grand Banquet",
            TIME: "",
            LOCATION: "Main Reception Hall",
            DESCRIPTION: "Formal luncheon banquet, speeches, cake cutting, and couple’s first dance.",
            ICON: Gite
        },
        {
            ID: 6,
            TITLE: "Sparkler Send-Off",
            TIME: '5:30 PM',
            LOCATION: "Garden Lawn",
            DESCRIPTION: "Sending off Jerald & Sheila with warm wishes and sparkler cheers!",
            ICON: AutoAwesome
        },
    ],
    FOOTER: {
        TITLE: "Kindly Respond",
        SUBTITLE: "Will You Celebrate With Us?",
        TAGLINE: "Let us know by July 1, 2027, so we can save a seat for you."
    },
    MAP: {
        CHURCH: [
            {
                TITLE: "From Manila — Private Car",
                LIST: [
                    {
                        ITEM: "Take the Tanauan–Sambat Exit from the STAR Tollway."
                    },
                    {
                        ITEM: "After exiting the tollway, turn right and head toward Brgy. Santor 1."
                    },
                    {
                        ITEM: "Continue straight and pass Tanauan City Hall and Petron gas station."
                    },
                    {
                        ITEM: "After passing these landmarks, continue straight until you reach the next intersection. Then, turn right."
                    },
                    {
                        ITEM: "Continue straight until you reach 📍 St. Augustine Parish Church. The destination will be on your left, with parking available around the area."
                    }
                ]
            },
            {
                TITLE: "From Batangas — Private Car",
                LIST: [
                    {
                        ITEM: "Take the Tanauan–Sambat Exit from the STAR Tollway."
                    },
                    {
                        ITEM: "After exiting the tollway, turn left and head toward Brgy. Santor 1."
                    },
                    {
                        ITEM: "Continue straight and pass Tanauan City Hall and Petron gas station."
                    },
                    {
                        ITEM: "After passing these landmarks, continue straight until you reach the next intersection. Then, turn right."
                    },
                    {
                        ITEM: "Continue straight until you reach 📍 St. Augustine Parish Church. The destination will be on your left, with parking available around the area."
                    }
                ]
            },
            {
                TITLE: "From Tanauan City Proper — Public Transportation",
                LIST: [
                    {
                        ITEM: "Make your way to Tanauan City Proper."
                    },
                    {
                        ITEM: "Take a tricycle heading to Brgy. Santor."
                    },
                    {
                        ITEM: "Tell the driver that your destination is St. Augustine Parish Church."
                    },
                    {
                        ITEM: "Ask to be dropped off at 📍 St. Augustine Parish Church. The destination will be on your left."
                    }
                ]
            }
        ],
        RECEPTION: [
            {
                TITLE: "How to get from St. Augustine Parish Church to Casa Lucido Events Place",
                LIST: [
                    {
                        ITEM: "From St. Augustine Parish, head toward Tanauan City proper. Once you reach the area of Victory Mall and McDonald’s, turn right."
                    },
                    {
                        ITEM: "Continue straight until you reach the next intersection. Turn right."
                    },
                    {
                        ITEM: "Continue straight to the following intersection, then turn right again."
                    },
                    {
                        ITEM: "Continue straight until you reach 📍 Casa Lucido Event Place. The destination will be on your right, with parking available on the left."
                    }
                ]
            }
        ]
    }
};

export const CONTENT_ENTOURAGE = {
    TITLE: "Wedding Party",
    SUBTITLE:
        "Meet those who will stand beside us as we begin our marriage, guided by faith and love.",

    PARENTS: {
        TITLE: "Parents",
        TAGLINE:
            "With praise and thanksgiving to God for the love, prayers, and guidance that have shaped our lives.",

        GROOM: {
            TITLE: "Parents of the Groom",
            FATHER: "Mr. Ruben Gutierrez",
            MOTHER: "Mrs. Nancy Gutierrez",
        },

        BRIDE: {
            TITLE: "Parents of the Bride",
            FATHER: "Mr. Marcelo Bathan",
            MOTHER: "Mrs. Deborah Bathan",
        },
    },

    PRINCIPAL_SPONSORS: {
        TITLE: "Principal Sponsors",
        TAGLINE:
            "With profound gratitude for the prayers, wisdom, and guidance that have strengthened our journey of faith.",
        SUBTITLE: "Godparents",

        LIST: [
            {
                NAME: "Mr. Firstname Lastname and Mrs. Firstname Lastname",
            },
            {
                NAME: "Mr. Firstname Lastname and Mrs. Firstname Lastname",
            },
            {
                NAME: "Mr. Firstname Lastname and Mrs. Firstname Lastname",
            },
            {
                NAME: "Mr. Firstname Lastname and Mrs. Firstname Lastname",
            },
            {
                NAME: "Mr. Firstname Lastname and Mrs. Firstname Lastname",
            },
            {
                NAME: "Mr. Firstname Lastname and Mrs. Firstname Lastname",
            },
        ],
    },

    SECONDARY_SPONSORS: {
        TITLE: "Secondary Sponsors",
        TAGLINE:
            "With heartfelt gratitude for those who share in the sacred rites of our marriage.",

        CANDLE: {
            TITLE: "Candle",
            NAMES: [
                "Mr. Firstname Lastname",
                "Ms. Firstname Lastname",
            ],
        },

        VEIL: {
            TITLE: "Veil",
            NAMES: [
                "Mr. Firstname Lastname",
                "Ms. Firstname Lastname",
            ],
        },

        CORD: {
            TITLE: "Cord",
            NAMES: [
                "Mr. Firstname Lastname",
                "Ms. Firstname Lastname",
            ],
        },
    },

    ENTOURAGE: {
        TITLE: "Entourage",
        TAGLINE:
            "With appreciation for the cherished friendships, family bonds, and steadfast support that have accompanied us through the years.",

        BRIDAL_PRIMARY: {
            MOH: {
                TITLE: "Maid of Honor",
                NAME: "Ms. Meriel Bathan",
            },

            BEST_MAN: {
                TITLE: "Best Man",
                NAME: "Mr. Paul John Gutierrez",
            },
        },

        BRIDAL_GROUP: {
            BRIDESMAIDS: {
                TITLE: "Bridesmaids",
                NAMES: [
                    "Ms. Firstname Lastname",
                    "Ms. Firstname Lastname",
                    "Ms. Firstname Lastname",
                    "Ms. Firstname Lastname",
                ],
            },

            GROOMSMEN: {
                TITLE: "Groomsmen",
                NAMES: [
                    "Mr. Dexter Bathan",
                    "Mr. Firstname Lastname",
                    "Mr. Firstname Lastname",
                    "Mr. Firstname Lastname",
                ],
            },
        },
    },

    LITTLE_ATTENDANT: {
        TITLE: "Little Attendants",
        TAGLINE:
            "With love for our cherished little ones who carry the symbols of our love and devotion.",

        BEARERS: {
            RING: {
                TITLE: "Ring Bearer",
                NAME: "Master Firstname Lastname",
            },

            COIN: {
                TITLE: "Coin Bearer",
                NAME: "Master Firstname Lastname",
            },

            BIBLE: {
                TITLE: "Bible Bearer",
                NAME: "Master Firstname Lastname",
            },
        },

        FLOWER_GIRLS: {
            TITLE: "Flower Girls",
            NAMES: [
                "Little Ms. Firstname Lastname",
                "Little Ms. Firstname Lastname",
            ],
        },
    },

    LINEUP: {
        TITLE: "Processional Line-up",
        TAGLINE: "The Journey to the Altar",

        LIST: [
            "BEST MAN",
            "PARENTS OF THE GROOM",
            "GROOM",
            "PRINCIPAL SPONSORS",
            "SECONDARY SPONSORS",
            "GROOMSMEN & BRIDESMAIDS",
            "FLOWER GIRLS & BEARERS",
            "MAID OF HONOR",
            "PARENTS OF THE BRIDE",
            "BRIDE",
        ],
    },

    PARALLAX_TITLE: "St. Augustine Parish Church",
    PARALLAX_SUBTITLE: "Where we enter into the sacred covenant of marriage before God.",
    
};

export const CONTENT_ATTIRE = {
    TITLE: "Attire Guide",
    SUBTITLE: "Dress in elegant <span class='fw-bold'>formal attire</span> and celebrate this beautiful occasion with us, inspired by our curated style guide and color palette.",
    TAB: {
        PALETTE: "Color Palette",
        GUEST: {
            TITLE: "Guest",
            GUIDE: "Guest Attire Guide",
            DETAILS: "<span class='fw-bold'>Ladies:</span> Elegant Formal Dress\n<span class='fw-bold'>Gentlemen:</span> Long- or Short-Sleeve Collared Polo with Tailored Dress Pants",
            NOTE: "",
            SUBDETAILS_1: "",
            SUBDETAILS_2: "",
        },
        SPONSORS: {
            TITLE: "Sponsors",
            GUIDE: "Principal & Secondary Sponsors Attire Guide",
            DETAILS: "<span class='fw-bold'>Ladies:</span> Modern Filipiniana Long Gown\n<span class='fw-bold'>Gentlemen:</span> Barong Tagalog with Tailored Black Trousers",
            NOTE: "",
            SUBDETAILS_1: "",
            SUBDETAILS_2: "",
        },
        ENTOURAGE: {
            TITLE: "Entourage",
            GUIDE: "Entourage Attire Guide",
            DETAILS: "<span class='fw-bold'>Ladies:</span> Elegant Floor-Length Gown with a Sheer Lace Bolero\n<span class='fw-bold'>Gentlemen:</span> Barong Tagalog with Tailored Black Trousers",
            NOTE: "",
            SUBDETAILS_1: "",
            SUBDETAILS_2: "",
        },
        PARENTS: {
            TITLE: "Parents",
            GUIDE: "Parents Attire Guide",
            DETAILS: "<span class='fw-bold'>Ladies:</span> Modern Filipiniana Long Gown\n<span class='fw-bold'>Gentlemen:</span> Barong Tagalog with Tailored Black Trousers",
            NOTE: "",
            SUBDETAILS_1: "",
            SUBDETAILS_2: "",
        }
    },
    NOTE_TITLE: "A Gentle Note on Attire",
    NOTE_SUBTITLE: "To maintain the elegant and cohesive atmosphere of our celebration, please kindly avoid the following:",
    NOTE_1_TITLE: "White / Ivory",
    NOTE_1_SUBTITLE: "Reserved for the Bride & Groom",
    NOTE_2_TITLE: "Colors Outside the Approved Palette",
    NOTE_2_SUBTITLE: "",
    NOTE_3_TITLE: "T-Shirts / Casual Tops",
    NOTE_3_SUBTITLE: "",
    NOTE_4_TITLE: "Shorts / Ripped Jeans",
    NOTE_4_SUBTITLE: "",
    NOTE_5_TITLE: "Flip-Flops / Casual Footwear",
    NOTE_5_SUBTITLE: "",
    NOTE_6_TITLE: "Overly Revealing / Excessively Casual Attire",
    NOTE_6_SUBTITLE: "",
};

export const CONTENT_FAQ = {
    TITLE: "Frequently Asked Questions",
    SUBTITLE: "Have questions about Jerald & Sheila’s wedding? Find everything you need below to prepare for the celebration.",
    SEARCH_PLACEHOLDER: "Search questions (e.g., ceremony time, dress code, RSVP)",
    SEARCH_NOMATCH: "No matching questions found for “{{0}}”. Try another search or explore the tabs above.",
    STILL_QUESTION: "Still Have Questions",
    CANT_FIND: "Can’t find the answer you’re looking for? Feel free to reach out to Jerald & Sheila directly.",
    BUTTON_SEND: "Send Us a Message",
    CATEGORIES: [
        {
            ID: "all",
            LABEL: "All Questions"
        },
        {
            ID: "ceremony",
            LABEL: "Ceremony & Venue"
        },
        {
            ID: "attire",
            LABEL: "Attire & Dress Code"
        },
        {
            ID: "rsvp",
            LABEL: "RSVP & Guests"
        },
        {
            ID: "gifts",
            LABEL: "Gifts & Registry"
        }
    ],
    DATA: [
        {
            ID: 1,
            CATEGORY: "ceremony",
            QUESTION: "When and where is the wedding, and what time should I arrive?",
            ANSWER: "<strong>Date:</strong> Saturday, July 17, 2027\n<strong>Ceremony:</strong> St. Augustine Parish Church\n<strong>Reception:</strong> Casa Lucido Events Place\n\nThe ceremony <strong>starts exactly at 10:00 AM</strong>. Please arrive <strong>before 9:30 AM</strong> to allow enough time for parking, finding your seat, and getting settled before the ceremony.\n\nPlease visit the <strong>Wedding</strong> page for more details. <a href=\"/wedding\">Click here to view."
        },
        {
            ID: 2,
            CATEGORY: "attire",
            QUESTION: "What should I wear?",
            ANSWER: "We kindly ask everyone to come in elegant and formal attire as we celebrate this joyous occasion together.\n\n<strong class='fs-4'>Parents</strong>\n<strong>Ladies:</strong> Modern Filipiniana Gown\n<strong>Gentlemen:</strong> Barong Tagalog\n\n<strong class='fs-4'>Principal Sponsors</strong>\n<strong>Ladies:</strong> Modern Filipiniana Gown\n<strong>Gentlemen:</strong> Barong Tagalog\n\n<strong class='fs-4'>Secondary Sponsors</strong>\n<strong>Ladies:</strong> Modern Filipiniana Gown\n<strong>Gentlemen:</strong> Barong Tagalog\n\n<strong class='fs-4'>Entourage</strong>\n<strong>Ladies:</strong> Elegant Floor-Length Gown with a Sheer Lace Bolero\n<strong>Gentlemen:</strong> Barong Tagalog with Tailored Black Trousers\n\n<strong class='fs-4'>Guests</strong>\n<strong>Ladies:</strong> Elegant Formal Dress\n<strong>Gentlemen:</strong> Long- or Short-Sleeve Collared Polo with Tailored Dress Pants\n\nPlease visit the <strong>Attire</strong> page for more details. <a href=\"/attire\">Click here to view</a>."
        },
        {
            ID: 3,
            CATEGORY: "rsvp",
            QUESTION: "What is RSVP, and do I need to RSVP?",
            ANSWER: "RSVP means “Please respond.” We kindly ask you to respond only if you are certain you can attend, as this will help us finalize the guest list and seating arrangements.\n\n<strong class='fs-4'>RSVP DEADLINE: July 1, 2027</strong>\n\nPlease visit the <strong>RSVP</strong> page for more details and complete the form. <a href=\"/rsvp\">Click here to view</a>."
        },
        {
            ID: 4,
            CATEGORY: "rsvp",
            QUESTION: "Can I bring a plus-one?",
            ANSWER: "<strong>No plus-ones</strong>. With limited seating, we’re keeping our celebration intimate and surrounded by close family and friends who are personally known to us. Thank you for understanding and being part of our special day."
        },
        {
            ID: 5,
            CATEGORY: "rsvp",
            QUESTION: "Can I bring my children?",
            ANSWER: "We love children, but due to limited seating, guests should be <strong>15 years old and above</strong>. Younger guests may attend if they are part of the wedding entourage or are close family of the bride and groom, with prior approval from us."
        },
        {
            ID: 6,
            CATEGORY: "ceremony",
            QUESTION: "Can I take photos and videos during the wedding?",
            ANSWER: "We have a <strong>professional photography and videography team</strong> capturing our special moments. You’re welcome to take your own photos and videos throughout the celebration—just please <strong>avoid blocking their shots or the view of other guests</strong>.\n\nWe’d love to see your behind-the-scenes photos and candid moments! Please visit our <strong>Candid page and upload your photos. <a href=\"/candid\">Click here to view</a>."
        },
        {
            ID: 7,
            CATEGORY: "gifts",
            QUESTION: "Do you have a gift registry?",
            ANSWER: "For those who wish to bless us with a gift, we would be truly grateful.\n\nPlease visit the <strong>Gift</strong> page for more details. <a href=\"/gift\">Click here to view</a>."
        },
        {
            ID: 8,
            CATEGORY: "ceremony",
            QUESTION: "What happens if it rains?",
            ANSWER: "We’re hoping for a beautiful sunny day, but <strong>rain or shine, we’ll be celebrating together!</strong> Both the ceremony and reception will be held indoors.\nSince July is part of the rainy season, please bring an umbrella and allow extra travel time."
        }
    ]
};

export const CONTENT_PROPOSAL = {
    TO: "To {{0}},",
    ATTIRE_GUIDE: "Attire Guide",
    INTRO: {
        TAGLINE: "We’re Tying the Knot",
        BIBLE: "“Above all, put on love, that is, the bond of perfection.” \nColossians 3:14"
    },
    SUMMARY: {
        TAGLINE: "Trusting in God's Perfect Plan, Grateful for His Boundless Grace.",
        SUBTAGLINE: "Alongside Our Families, We Request the Honor of Your Presence as We Exchange Our Wedding Vows and Share in Our Joy",
        DATE: "July 17, 2027 | Saturday \n10:00 AM",
        CEREMONY: "The Ceremony",
        RECEPTION: "The Reception"
    },
    PRINCIPAL: {
        TITLE: "Principal Sponsors",
        LETTER: {
            "yuson-123": {
                NAME: "COL Germiniano Yuson Jr (RET) and Mrs Ethel Yuson",
                MESSAGE: "Stepping into this sacred season of our lives, we find ourselves filled with gratitude as we prepare to receive the Sacrament of Marriage and begin the sacred covenant God has called us to. This journey has reminded us of the many blessings He has placed along our path and the people who have helped shape who we are today. \n\nAmong those blessings, you hold a truly special place in our hearts. The love you share, the values you uphold, and the example you continue to set are qualities we deeply admire and respect. Your life has been a beautiful reflection of faith, kindness, and commitment, and it would be our greatest honor to have you stand with us as we begin this new chapter in our lives. \n\nAs our Godparents, we hope to be blessed with your prayers, wisdom, and guidance—not only on our wedding day but throughout the journey of our marriage. We believe that your presence in our lives will continue to remind us to nurture the love and commitment we have promised to one another with faith, patience, and devotion. \n\nWith all our love and gratitude, we humbly ask…",
                QUESTION: {
                    WHAT: "Will you stand by our side as our",
                    WHO: "Principal Sponsors?"
                },
            },
            "yuson-456": {
                NAME: "COL Germiniano Yuson Jr (RET) and Mrs Ethel Yuson",
                MESSAGE: "Stepping into this sacred season of our lives, we find ourselves filled with gratitude as we prepare to receive the Sacrament of Marriage and begin the sacred covenant God has called us to. This journey has reminded us of the many blessings He has placed along our path and the people who have helped shape who we are today. \n\nAmong those blessings, you hold a truly special place in our hearts. The love you share, the values you uphold, and the example you continue to set are qualities we deeply admire and respect. Your life has been a beautiful reflection of faith, kindness, and commitment, and it would be our greatest honor to have you stand with us as we begin this new chapter in our lives. \n\nAs our Godparents, we hope to be blessed with your prayers, wisdom, and guidance—not only on our wedding day but throughout the journey of our marriage. We believe that your presence in our lives will continue to remind us to nurture the love and commitment we have promised to one another with faith, patience, and devotion. \n\nWith all our love and gratitude, we humbly ask…",
                QUESTION: {
                    WHAT: "Will you stand by our side as our",
                    WHO: "Principal Sponsors?"
                },
            },
        },
        ATTIRE: {
            MESSAGE: "To complement the timeless elegance of our celebration, we graciously invite our beloved Principal Sponsors (Godparents) to wear a Barong Tagalog for gentlemen and a Modern Filipiniana Gown for ladies, following the color palette below. \n\nWe humbly ask for your kind understanding that the attire, hair and makeup (where applicable), and any other related personal expenses shall be at your own expense. Your presence as our Principal Sponsors is one of the greatest honors and blessings we could receive. We sincerely appreciate your thoughtfulness and support in helping us create a celebration that is both elegant and meaningful. \n\nThank you for being part of this unforgettable milestone in our lives."
        }
    },
    SECONDARY: {
        TITLE: "Secondary Sponsors",
        LETTER: {
            "yuson-123": {
                NAME: "COL Germiniano Yuson Jr (RET) and Mrs Ethel Yuson",
                MESSAGE: "Stepping into this sacred season of our lives, we find ourselves filled with gratitude as we prepare to receive the Sacrament of Marriage and begin the sacred covenant God has called us to. This journey has reminded us of the many blessings He has placed along our path and the people who have helped shape who we are today. \n\nAmong those blessings, you hold a truly special place in our hearts. The love you share, the values you uphold, and the example you continue to set are qualities we deeply admire and respect. Your life has been a beautiful reflection of faith, kindness, and commitment, and it would be our greatest honor to have you stand with us as we begin this new chapter in our lives. \n\nAs our Godparents, we hope to be blessed with your prayers, wisdom, and guidance—not only on our wedding day but throughout the journey of our marriage. We believe that your presence in our lives will continue to remind us to nurture the love and commitment we have promised to one another with faith, patience, and devotion. \n\nWith all our love and gratitude, we humbly ask…",
                QUESTION: {
                    WHAT: "Will you stand by our side as our",
                    WHO: "Candle Sponsors?"
                },
            },
            "yuson-456": {
                NAME: "COL Germiniano Yuson Jr (RET) and Mrs Ethel Yuson",
                MESSAGE: "Stepping into this sacred season of our lives, we find ourselves filled with gratitude as we prepare to receive the Sacrament of Marriage and begin the sacred covenant God has called us to. This journey has reminded us of the many blessings He has placed along our path and the people who have helped shape who we are today. \n\nAmong those blessings, you hold a truly special place in our hearts. The love you share, the values you uphold, and the example you continue to set are qualities we deeply admire and respect. Your life has been a beautiful reflection of faith, kindness, and commitment, and it would be our greatest honor to have you stand with us as we begin this new chapter in our lives. \n\nAs our Godparents, we hope to be blessed with your prayers, wisdom, and guidance—not only on our wedding day but throughout the journey of our marriage. We believe that your presence in our lives will continue to remind us to nurture the love and commitment we have promised to one another with faith, patience, and devotion. \n\nWith all our love and gratitude, we humbly ask…",
                QUESTION: {
                    WHAT: "Will you stand by our side as our",
                    WHO: "Veil Sponsors?"
                },
            },
            "yuson-789": {
                NAME: "COL Germiniano Yuson Jr (RET) and Mrs Ethel Yuson",
                MESSAGE: "Stepping into this sacred season of our lives, we find ourselves filled with gratitude as we prepare to receive the Sacrament of Marriage and begin the sacred covenant God has called us to. This journey has reminded us of the many blessings He has placed along our path and the people who have helped shape who we are today. \n\nAmong those blessings, you hold a truly special place in our hearts. The love you share, the values you uphold, and the example you continue to set are qualities we deeply admire and respect. Your life has been a beautiful reflection of faith, kindness, and commitment, and it would be our greatest honor to have you stand with us as we begin this new chapter in our lives. \n\nAs our Godparents, we hope to be blessed with your prayers, wisdom, and guidance—not only on our wedding day but throughout the journey of our marriage. We believe that your presence in our lives will continue to remind us to nurture the love and commitment we have promised to one another with faith, patience, and devotion. \n\nWith all our love and gratitude, we humbly ask…",
                QUESTION: {
                    WHAT: "Will you stand by our side as our",
                    WHO: "Cord Sponsors?"
                },
            },
        },
        ATTIRE: {
            MESSAGE: "To complement the timeless elegance of our celebration, we graciously invite our beloved Principal Sponsors (Godparents) to wear a Barong Tagalog for gentlemen and a Modern Filipiniana Gown for ladies, following the color palette below. \n\nWe humbly ask for your kind understanding that the attire, hair and makeup (where applicable), and any other related personal expenses shall be at your own expense. Your presence as our Principal Sponsors is one of the greatest honors and blessings we could receive. We sincerely appreciate your thoughtfulness and support in helping us create a celebration that is both elegant and meaningful. \n\nThank you for being part of this unforgettable milestone in our lives."
        }
    },
    ENTOURAGE: {
        BRIDESMAIDS: {
            TITLE: "Bridesmaids",
            LETTER: {
                "yuson-123": {
                    NAME: "COL Germiniano Yuson Jr (RET) and Mrs Ethel Yuson",
                    MESSAGE: "Stepping into this sacred season of our lives, we find ourselves filled with gratitude as we prepare to receive the Sacrament of Marriage and begin the sacred covenant God has called us to. This journey has reminded us of the many blessings He has placed along our path and the people who have helped shape who we are today. \n\nAmong those blessings, you hold a truly special place in our hearts. The love you share, the values you uphold, and the example you continue to set are qualities we deeply admire and respect. Your life has been a beautiful reflection of faith, kindness, and commitment, and it would be our greatest honor to have you stand with us as we begin this new chapter in our lives. \n\nAs our Godparents, we hope to be blessed with your prayers, wisdom, and guidance—not only on our wedding day but throughout the journey of our marriage. We believe that your presence in our lives will continue to remind us to nurture the love and commitment we have promised to one another with faith, patience, and devotion. \n\nWith all our love and gratitude, we humbly ask…",
                    QUESTION: {
                        WHAT: "Will you stand by my side as my",
                        WHO: "Maid of Honor?"
                    },
                },
                "yuson-456": {
                    NAME: "COL Germiniano Yuson Jr (RET) and Mrs Ethel Yuson",
                    MESSAGE: "Stepping into this sacred season of our lives, we find ourselves filled with gratitude as we prepare to receive the Sacrament of Marriage and begin the sacred covenant God has called us to. This journey has reminded us of the many blessings He has placed along our path and the people who have helped shape who we are today. \n\nAmong those blessings, you hold a truly special place in our hearts. The love you share, the values you uphold, and the example you continue to set are qualities we deeply admire and respect. Your life has been a beautiful reflection of faith, kindness, and commitment, and it would be our greatest honor to have you stand with us as we begin this new chapter in our lives. \n\nAs our Godparents, we hope to be blessed with your prayers, wisdom, and guidance—not only on our wedding day but throughout the journey of our marriage. We believe that your presence in our lives will continue to remind us to nurture the love and commitment we have promised to one another with faith, patience, and devotion. \n\nWith all our love and gratitude, we humbly ask…",
                    QUESTION: {
                        WHAT: "Will you stand by my side as my",
                        WHO: "Bridesmaid?"
                    },
                },
            },
            ATTIRE: {
                MESSAGE: "To complement the timeless elegance of our celebration, we graciously invite our beloved Principal Sponsors (Godparents) to wear a Barong Tagalog for gentlemen and a Modern Filipiniana Gown for ladies, following the color palette below. \n\nWe humbly ask for your kind understanding that the attire, hair and makeup (where applicable), and any other related personal expenses shall be at your own expense. Your presence as our Principal Sponsors is one of the greatest honors and blessings we could receive. We sincerely appreciate your thoughtfulness and support in helping us create a celebration that is both elegant and meaningful. \n\nThank you for being part of this unforgettable milestone in our lives."
            }
        },
        GROOMSMEN: {
            TITLE: "Groomsmen",
            LETTER: {
                "yuson-123": {
                    NAME: "COL Germiniano Yuson Jr (RET) and Mrs Ethel Yuson",
                    MESSAGE: "Stepping into this sacred season of our lives, we find ourselves filled with gratitude as we prepare to receive the Sacrament of Marriage and begin the sacred covenant God has called us to. This journey has reminded us of the many blessings He has placed along our path and the people who have helped shape who we are today. \n\nAmong those blessings, you hold a truly special place in our hearts. The love you share, the values you uphold, and the example you continue to set are qualities we deeply admire and respect. Your life has been a beautiful reflection of faith, kindness, and commitment, and it would be our greatest honor to have you stand with us as we begin this new chapter in our lives. \n\nAs our Godparents, we hope to be blessed with your prayers, wisdom, and guidance—not only on our wedding day but throughout the journey of our marriage. We believe that your presence in our lives will continue to remind us to nurture the love and commitment we have promised to one another with faith, patience, and devotion. \n\nWith all our love and gratitude, we humbly ask…",
                    QUESTION: {
                        WHAT: "Will you stand by my side as my",
                        WHO: "Best Man?"
                    },
                },
                "yuson-456": {
                    NAME: "COL Germiniano Yuson Jr (RET) and Mrs Ethel Yuson",
                    MESSAGE: "Stepping into this sacred season of our lives, we find ourselves filled with gratitude as we prepare to receive the Sacrament of Marriage and begin the sacred covenant God has called us to. This journey has reminded us of the many blessings He has placed along our path and the people who have helped shape who we are today. \n\nAmong those blessings, you hold a truly special place in our hearts. The love you share, the values you uphold, and the example you continue to set are qualities we deeply admire and respect. Your life has been a beautiful reflection of faith, kindness, and commitment, and it would be our greatest honor to have you stand with us as we begin this new chapter in our lives. \n\nAs our Godparents, we hope to be blessed with your prayers, wisdom, and guidance—not only on our wedding day but throughout the journey of our marriage. We believe that your presence in our lives will continue to remind us to nurture the love and commitment we have promised to one another with faith, patience, and devotion. \n\nWith all our love and gratitude, we humbly ask…",
                    QUESTION: {
                        WHAT: "Will you stand by my side as my",
                        WHO: "Groomsman?"
                    },
                },
            },
            ATTIRE: {
                MESSAGE: "To complement the timeless elegance of our celebration, we graciously invite our beloved Principal Sponsors (Godparents) to wear a Barong Tagalog for gentlemen and a Modern Filipiniana Gown for ladies, following the color palette below. \n\nWe humbly ask for your kind understanding that the attire, hair and makeup (where applicable), and any other related personal expenses shall be at your own expense. Your presence as our Principal Sponsors is one of the greatest honors and blessings we could receive. We sincerely appreciate your thoughtfulness and support in helping us create a celebration that is both elegant and meaningful. \n\nThank you for being part of this unforgettable milestone in our lives."
            }
        },
        LITTLE_ATTENDANT: {

        }
    },
    PARENTS: {

    }
}