import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Recommendation {
  id: string;
  category: string;
  recommendation: string;
  sources: string[];
  sourceTags: string[];
  needTags: string[];
}

// PASTE THE FULL ARRAY FROM database_1.js HERE
const FULL_RECOMMENDATIONS_LIST_FOR_SEEDING = [
  // =================================================================
  // == Communication Access
  // =================================================================
  {
    "id": "a4b1c2",
    "category": "Communication Access",
    "recommendation": "Healthcare providers have a duty to provide effective communication to all patients and their families, caregivers, or companions with disabilities, and this responsibility applies regardless of the office size or number of employees.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 4", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 5", "University of Delaware (2017) Effective Communication for Healt, p. 7", "University of Delaware (2017) Effective Communication for Healt, p. 8", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 5"],
    "sourceTags": ["HHS (2020)", "University of Delaware (2017)", "DREDF (2014)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "d3e4f5",
    "category": "Communication Access",
    "recommendation": "Provide auxiliary aids and services necessary to ensure effective communication for individuals with disabilities at no additional cost to the patient.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 5", "University of Delaware (2017) Effective Communication for Healt, p. 8", "HHS (2020) Getting the care you need_A guide for people with di, p. 5", "HHS (2020) Getting the care you need_A guide for people with di, p. 6", "HRSA_Improving the Health of People with Disabilities_How to me, p. 15", "DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 4", "DREDF (2014) Modules Improving Access to Health Care for People, p. 23", "DREDF (2014) Modules Improving Access to Health Care for People, p. 24"],
    "sourceTags": ["University of Delaware (2017)", "HHS (2020)", "HRSA", "DREDF (2010)", "DREDF (2014)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "g6h7i8",
    "category": "Communication Access",
    "recommendation": "Healthcare providers and staff must determine the appropriate auxiliary aids and services based on the nature of the communication and the patient’s preferred method of communication, giving primary consideration to the method requested by the individual.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 8", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 5"],
    "sourceTags": ["University of Delaware (2017)", "DREDF (2014)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "j9k1l2",
    "category": "Communication Access",
    "recommendation": "Providers cannot require individuals with disabilities to bring their own interpreters, readers, or other assistants to facilitate communication, nor rely on a companion or family member to interpret, except in specific emergencies or if it is the patient's explicit preference after being informed of the right to a professional interpreter.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 8", "HHS (2020) Getting the care you need_A guide for people with di, p. 6", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 5"],
    "sourceTags": ["University of Delaware (2017)", "HHS (2020)", "DREDF (2014)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "m3n4o5",
    "category": "Communication Access",
    "recommendation": "If a patient requires the presence of a family member, personal care assistant, communicator, or similar disability service provider for communication or care management, this should be allowed, provided reasonable precautions can be taken against infection spread.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 5"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "p6q7r8",
    "category": "Communication Access",
    "recommendation": "Inform all patients, including those with communication disabilities, about the practice's policy on providing accommodations and auxiliary aids.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 4"],
    "sourceTags": ["DREDF (2010)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "s9t1u2",
    "category": "Communication Access",
    "recommendation": "Offer alternate modes of providing information and interacting with patients to ensure content is understandable and useful to everyone.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Commu, p. 1"],
    "sourceTags": ["Health First Colorado"],
    "needTags": ["money", "time", "staff", "education"]
  },
  {
    "id": "v3w4x5",
    "category": "Communication Access",
    "recommendation": "Make alternatives to phone-only communication available, such as email, text messaging, and web forms.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Commu, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 117 - 118", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 12"],
    "sourceTags": ["Health First Colorado", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff"]
  },
  {
    "id": "y6z7a8",
    "category": "Communication Access",
    "recommendation": "Ensure Electronic Information Technology (EIT) employed by the entity is accessible, or provide reasonable accommodations/modifications that allow individuals with disabilities to receive all benefits of the EIT equally effectively.",
    "sources": ["HHS (2016) Guidance and Resources for Electronic Information Te, p. 2"],
    "sourceTags": ["HHS (2016)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "b9c1d2",
    "category": "Communication Access",
    "recommendation": "Provide effective communication for individuals who are deaf or hard of hearing through means such as qualified sign language interpreters (in-person or via Video Remote Interpreting - VRI), oral interpreters, real-time captioning, assistive listening devices, written materials, TTYs, and relay services. Ask about the patient's preferred communication method.",
    "sources": ["HHS (2020) Bulletin- Civil Rights, HIPAA", "University of Delaware (2017) Effective Communication for Healt, p. 13", "University of Delaware (2017) Effective Communication for Healt, p. 28", "HHS (2020) Getting the care you need_A guide for people with di, p. 5", "DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 8", "NCD (2009) The Current State of Health Care for People with Dis, p. 98", "UCSM_Collecting Patients' Disability Status_Training materials, p. 22", "Health First Colorado_Best Practices Disability Competent Commu, p. 1", "KU (2023) Disability Resources for Healthcare Providers, p. 3", "DREDF (2014) Modules Improving Access to Health Care for People, p. 23", "DREDF (2014) Modules Improving Access to Health Care for People, p. 25", "DREDF (2014) Modules Improving Access to Health Care for People, p. 52", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 10", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 11"],
    "sourceTags": ["HHS (2020)", "University of Delaware (2017)", "DREDF (2010)", "NCD (2009)", "UCSM", "Health First Colorado", "KU (2023)", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money", "time", "staff", "education"]
  },
  {
    "id": "e3f4g5",
    "category": "Communication Access",
    "recommendation": "To locate a certified sign language interpreter, ask the patient for suggestions or use resources like the Registry for Interpreters for the Deaf (RID).",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 17", "Health First Colorado_10 Simple Steps for Disability Competent, p. 1"],
    "sourceTags": ["University of Delaware (2017)", "Health First Colorado"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "h6i7j8",
    "category": "Communication Access",
    "recommendation": "Be aware of and facilitate the use of telecommunications relay services (e.g., 7-1-1 dialing, Video Relay Service (VRS), Sprint IP Relay, Voice Carry Over (VCO), Hearing Carry Over (HCO), Spanish Relay) for patients who need them.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 16", "University of Delaware (2017) Effective Communication for Healt, p. 17", "DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 117 - 118", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 12"],
    "sourceTags": ["University of Delaware (2017)", "DREDF (2010)", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "k9l1m2",
    "category": "Communication Access",
    "recommendation": "If public telephones are provided, ensure at least one has a volume control.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 88"],
    "sourceTags": ["ADA (2016)"],
    "needTags": ["money"]
  },
  {
    "id": "n3o4p5",
    "category": "Communication Access",
    "recommendation": "Use visual notifications (e.g., vibrating pagers, colored lights) for patients who are deaf or hard of hearing to signal when the clinician is ready or when actions are needed during procedures.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 15", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 16", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["CMS (2021)", "CMS (2022)"],
    "needTags": ["money", "staff"]
  },
  {
    "id": "q6r7s8",
    "category": "Communication Access",
    "recommendation": "Install sound-absorbing materials (e.g., curtains, ceiling tiles) to minimize background noise for patients with hearing loss.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 12"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["money"]
  },
  {
    "id": "t9u1v2",
    "category": "Communication Access",
    "recommendation": "Explore assistive technology like captions and video phones that may assist patients with hearing loss.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 28"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money", "education"]
  },
  {
    "id": "w3x4y5",
    "category": "Communication Access",
    "recommendation": "Provide printed information in alternative formats for people who are blind or have low vision, such as large print, Braille, audio format (CD, MP3), or electronic files (text, PDF, HTML) compatible with screen readers. Consider using magnifying glasses.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 13", "University of Delaware (2017) Effective Communication for Healt, p. 21", "HHS (2020) Getting the care you need_A guide for people with di, p. 5", "DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 9", "DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 10", "ADA National Network (2017) Accessible Health Care, p. 3", "UCSM_Collecting Patients' Disability Status_Training materials, p. 23", "Health First Colorado_Best Practices Disability Competent Commu, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 23", "DREDF (2014) Modules Improving Access to Health Care for People, p. 25", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 11", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["University of Delaware (2017)", "HHS (2020)", "DREDF (2010)", "ADA National Network (2017)", "UCSM", "Health First Colorado", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "z6a7b8",
    "category": "Communication Access",
    "recommendation": "Offer the services of a qualified reader to read printed information to individuals who are blind or have low vision, with the patient’s permission.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 10", "ADA National Network (2017) Accessible Health Care, p. 3", "UCSM_Collecting Patients' Disability Status_Training materials, p. 23"],
    "sourceTags": ["DREDF (2010)", "ADA National Network (2017)", "UCSM"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "c9d1e2",
    "category": "Communication Access",
    "recommendation": "For large print documents: use 18-point bold serif font (e.g., Times New Roman) for body text and a bold simple sans-serif font (e.g., Arial) for headings (larger fonts may be used for headings or upon request); use a minimum of 1.5 line spacing (double space when possible); print on single-sided 8.5\"x11\" non-glossy, off-white paper, stapled top left; use portrait orientation unless a visual element requires landscape; left-justify paragraphs with 1-inch margins; avoid small caps, italics (use underlining for emphasis), all caps, compressed/condensed fonts, or decorative graphics that don't add meaning.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 18 (general print guidelines applicable here too)", "University of Delaware (2017) Effective Communication for Healt, p. 22", "KU (2023) Disability Resources for Healthcare Providers, p. 4"],
    "sourceTags": ["University of Delaware (2017)", "KU (2023)"],
    "needTags": ["money", "education"]
  },
  {
    "id": "f3g4h5",
    "category": "Communication Access",
    "recommendation": "When providing electronic text files (e.g., via email, CD, flash drive): use simple, standard page layout; ensure high visual contrast between text and background; use captions or \"alt text\" to describe graphics; use a simple font, avoiding italics or compressed fonts; consider text file format for broad compatibility. When posting documents online, offer multiple formats (e.g., PDF, HTML, text version) as PDFs may not always be screen reader friendly.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 23", "KU (2023) Disability Resources for Healthcare Providers, p. 4"],
    "sourceTags": ["University of Delaware (2017)", "KU (2023)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "i6j7k8",
    "category": "Communication Access",
    "recommendation": "For audio recordings: ensure clear, high-quality sound; use double beeps for chapter beginnings and single beeps for pages; label cassettes/CDs with both Braille and print labels; consider offering a text version alongside the audio.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 23"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "l9m1n2",
    "category": "Communication Access",
    "recommendation": "For Braille documents: put page numbers at the top right-hand corner; use wider margins on the left side; if using a Braille printer, have someone check for accuracy.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 23"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "o3p4q5",
    "category": "Communication Access",
    "recommendation": "Use oral notifications for individuals who are blind when clinicians are ready for appointments or for other necessary alerts.",
    "sources": ["CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["CMS (2022)"],
    "needTags": ["staff"]
  },
  {
    "id": "r6s7t8",
    "category": "Communication Access",
    "recommendation": "Reduce glare from lighting to improve visibility for individuals with low vision.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 13"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["money"]
  },
  {
    "id": "u9v1w2",
    "category": "Communication Access",
    "recommendation": "Provide effective communication for individuals with speech disabilities through means such as picture boards, TTYs, relay services, or written communication.",
    "sources": ["HHS (2020) Bulletin- Civil Rights, HIPAA", "University of Delaware (2017) Effective Communication for Healt, p. 17 (TTY reference)"],
    "sourceTags": ["HHS (2020)", "University of Delaware (2017)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "x3y4z5",
    "category": "Communication Access",
    "recommendation": "For individuals with intellectual or developmental disabilities, use communication methods such as written notes, readers, and letter, word, picture, or translator boards.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 10"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff", "time", "education"]
  },
  {
    "id": "a6b7c8",
    "category": "Communication Access",
    "recommendation": "Use diagrams and pictures to improve communication for various individuals.",
    "sources": ["ADA National Network (2017) Accessible Health Care, p. 3"],
    "sourceTags": ["ADA National Network (2017)"],
    "needTags": ["money", "education"]
  },
  {
    "id": "d9e1f2",
    "category": "Communication Access",
    "recommendation": "When creating printed materials (brochures, handouts, forms): present the same content in multiple formats if possible; use simple and direct language at an elementary reading level (e.g., sixth-grade); use large font (at least 12-point) with extra space between lines; use clean, simple fonts (avoiding fancy fonts and italics); do not clutter text with shading, overlays, or use pictures behind text; use matte, off-white paper instead of glossy white; ensure sufficient contrast between text and background (preferably dark font on light background).",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 18", "Health First Colorado_Best Practices Disability Competent Commu, p. 1"],
    "sourceTags": ["University of Delaware (2017)", "Health First Colorado"],
    "needTags": ["money", "education"]
  },
  {
    "id": "g3h4i5",
    "category": "Communication Access",
    "recommendation": "Include photos of individuals with disabilities in publications.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 18"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money", "staff"]
  },
  {
    "id": "j6k7l8",
    "category": "Communication Access",
    "recommendation": "For posters: use large font legible from 3-6 feet; use sans-serif fonts like Arial or Verdana; ensure high contrast between text and background; use properly spaced text characters (e.g., vertical line spacing 1.2-2.0, horizontal tracking +3); do not place text over images; refer to image/graphic titles in text; and clearly explain data charts with text on the poster.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 20"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money", "education"]
  },
  {
    "id": "m9n1o2",
    "category": "Communication Access",
    "recommendation": "Ensure facility signage (including for parking, entrances, restrooms, elevators, and room identification) is clear, legible, uses appropriate size, fonts, and high color contrast. Use universally recognized symbols where appropriate.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 11", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 32", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["ADA (2016)", "Health First Colorado", "Colorado Dept HCPF (2019)", "CMS (2021)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "p3q4r5",
    "category": "Communication Access",
    "recommendation": "Provide tactile signage (raised characters and Braille) for permanent room and space identifiers such as floor designations, room numbers, restroom signs, and elevator controls/jambs, mounted at an accessible height (e.g., baseline of lowest character 48 inches to baseline of highest character 60 inches above floor).",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 38", "ADA (2016) ADA Checklist for Existing Facilities, p. 39", "ADA (2016) ADA Checklist for Existing Facilities, p. 63", "ADA National Network (2017) Accessible Health Care, p. 1", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14"],
    "sourceTags": ["ADA (2016)", "ADA National Network (2017)", "Health First Colorado", "CMS (2021)"],
    "needTags": ["money"]
  },
  {
    "id": "s6t7u8",
    "category": "Communication Access",
    "recommendation": "Ensure elevator cars have audible signals that sound as the car passes or is about to stop at a floor.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 39", "Health First Colorado_Best Practices Disability Competent Physi, p. 1"],
    "sourceTags": ["ADA (2016)", "Health First Colorado"],
    "needTags": ["money"]
  },
  {
    "id": "v9w1x2",
    "category": "Communication Access",
    "recommendation": "Ensure fire alarm systems are accessible (e.g., include visual components).",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 89"],
    "sourceTags": ["ADA (2016)"],
    "needTags": ["money"]
  },
  {
    "id": "y3z4a5",
    "category": "Communication Access",
    "recommendation": "Make standard patient information materials (e.g., practice descriptions, intake forms, contracts, benefits, rights, consent forms, medication instructions, health education) available in accessible alternative formats (large print, Braille, audio, electronic) upon request and inform patients of this availability, potentially using universally recognized symbols on printed materials.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 9", "University of Delaware (2017) Effective Communication for Healt, p. 30", "Health First Colorado_10 Simple Steps for Disability Competent, p. 1", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 11 - 12", "UCSM_Collecting Patients' Disability Status_Training materials, p. 25", "UCSM_Collecting Patients' Disability Status_Training materials, p. 26", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["DREDF (2010)", "University of Delaware (2017)", "Health First Colorado", "CMS (2021)", "Colorado Dept HCPF (2019)", "UCSM", "CMS (2022)"],
    "needTags": ["money", "staff", "time", "education"]
  },
  {
    "id": "b6c7d8",
    "category": "Communication Access",
    "recommendation": "Ensure websites providing practice information or emergency-related information are accessible to all users, including those using screen-reading technology, by adhering to guidelines such as the Web Content Accessibility Guidelines (WCAG) 2.0 Level AA.",
    "sources": ["HHS (2020) Bulletin- Civil Rights, HIPAA", "University of Delaware (2017) Effective Communication for Healt, p. 19", "ADA National Network (2017) Accessible Health Care, p. 3", "KU (2023) Disability Resources for Healthcare Providers, p. 4", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 12"],
    "sourceTags": ["HHS (2020)", "University of Delaware (2017)", "ADA National Network (2017)", "KU (2023)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "e9f1g2",
    "category": "Communication Access",
    "recommendation": "For web content: provide text alternatives for non-text content (e.g., \"alt text\" for images/graphs); provide captions and other alternatives for multimedia; create content presentable in different ways by assistive technologies without losing meaning; make it easier for users to see and hear content; ensure all functionality is available from a keyboard; give users enough time to read/use content; do not use visual features that could trigger seizures; help users navigate and find content; make text readable and understandable; make content appear and operate predictably; help users avoid/correct mistakes; and maximize compatibility with current/future user tools.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 19", "KU (2023) Disability Resources for Healthcare Providers, p. 4"],
    "sourceTags": ["University of Delaware (2017)", "KU (2023)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "h3i4j5",
    "category": "Communication Access",
    "recommendation": "Place information about accessibility features and policies on your website where it is easy to find.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Physi, p. 1"],
    "sourceTags": ["Health First Colorado"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "k6l7m8",
    "category": "Communication Access",
    "recommendation": "During presentations: use a microphone (important for assistive listening devices); repeat audience questions into the microphone before answering; provide verbal descriptions of all visual aids (overheads, slides, charts), reading all text.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 25"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "n9o1p2",
    "category": "Communication Access",
    "recommendation": "For presentation slides: keep text clear and simple; use large fonts (e.g., title fonts 44-point or greater, text fonts 36-point or greater); place no more than 6 lines of text on a slide; allow audience time to read slides; replace graphics with text whenever possible, or if graphics are used, include a detailed explanation of the  meaning  of the graphic on a subsequent text-only slide; avoid slide transitions, busy backgrounds, overcrowded text, low-contrast color schemes, and uncaptioned videos.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 20", "University of Delaware (2017) Effective Communication for Healt, p. 21"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["time", "education"]
  },
  {
    "id": "q3r4s5",
    "category": "Communication Access",
    "recommendation": "Present key points during meetings or presentations in multiple ways (e.g., visual, auditory, tactile).",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 25"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["time", "education"]
  },
  {
    "id": "t6u7v8",
    "category": "Communication Access",
    "recommendation": "Make handout materials for meetings available to planners in advance so alternative formats can be produced if requested, or speakers should bring their own copies in alternate formats. Offer participants the opportunity to request accommodations.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 24", "University of Delaware (2017) Effective Communication for Healt, p. 25"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "w9x1y2",
    "category": "Communication Access",
    "recommendation": "Develop and implement processes, procedures, and policies to provide communication access, including having a designated responsible individual and a plan for how procedures will be followed in a timely manner.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 11"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "z3a4b5",
    "category": "Communication Access",
    "recommendation": "Establish a practice to identify, document, and communicate patient accommodation requirements when making/confirming appointments and throughout their care (e.g., for sign language interpretation, oral interpretation, assistive listening devices, alternative print formats, extended appointment time).",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 10"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "c6d7e8",
    "category": "Communication Access",
    "recommendation": "Have alternative forms of communication available on a non-scheduled basis (e.g., for drop-in patients).",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 11"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "f9g1h2",
    "category": "Communication Access",
    "recommendation": "Make staff available to assist patients with completing written documents or paperwork, ensuring confidentiality in a private location if needed.",
    "sources": ["CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3", "DREDF (2014) Modules Improving Access to Health Care for People, p. 117 - 118"],
    "sourceTags": ["CMS (2022)", "DREDF (2014)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "i3j4k5",
    "category": "Communication Access",
    "recommendation": "Ensure timely communication and responsive follow-up, with flexibility in schedules to address emerging concerns, potentially on a same-day basis depending on urgency.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 17"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "l6m7n8",
    "category": "Communication Access",
    "recommendation": "Identify local organizations or resources for contracting accommodations like Sign Language interpreters or obtaining print materials in alternative formats.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 5"],
    "sourceTags": ["DREDF (2010)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "o9p1q2",
    "category": "Communication Access",
    "recommendation": "Develop protocols for what to do when a patient with a disability arrives and needs an accommodation that has not been planned for in advance.",
    "sources": ["CMS (2022) How to Improve Physical Accessibility at Your Health, p. 4"],
    "sourceTags": ["CMS (2022)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "r3s4t5",
    "category": "Communication Access",
    "recommendation": "Provide information in a way the patient understands.",
    "sources": ["HHS (2020) Getting the care you need_A guide for people with di, p. 4"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "u6v7w8",
    "category": "Communication Access",
    "recommendation": "When patients call to schedule, encourage them to state their disability-related needs and required accommodations. If scheduling online, provide a way to note these needs or encourage a follow-up call.",
    "sources": ["CMS (2022) Getting the Care You Need Guide for People with Disa, p. 6"],
    "sourceTags": ["CMS (2022)"],
    "needTags": ["staff", "time", "education"]
  },
  // =================================================================
  // == Disability Etiquette
  // =================================================================
  {
    "id": "x9y1z2",
    "category": "Disability Etiquette",
    "recommendation": "Speak and direct questions to the individual patient, not their companion, personal care attendant (PCA), or interpreter; even if interaction with a PCA is necessary, ensure the patient receives primary respect and direct attention.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 1", "University of Delaware (2017) Effective Communication for Healt, p. 12", "University of Delaware (2017) Effective Communication for Healt, p. 28", "ADA National Network (2017) Accessible Health Care, p. 3", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 19"],
    "sourceTags": ["Northwest ADA Center (2020)", "University of Delaware (2017)", "ADA National Network (2017)", "ADA (2010)", "CMS (2021)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "a3b4c5",
    "category": "Disability Etiquette",
    "recommendation": "Recognize that a person's mobility device (e.g., wheelchair, cane, walker, crutch) or other assistive equipment is part of their personal space and should not be touched, leaned on, used inappropriately (e.g., as a coat hanger), kicked, pushed, pulled, or otherwise physically interacted with unless requested or with explicit permission.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 1", "University of Delaware (2017) Effective Communication for Healt, p. 31", "University of Delaware (2017) Effective Communication for Healt, p. 36", "KU (2023) Notes on Disability Etiquette, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 10"],
    "sourceTags": ["Northwest ADA Center (2020)", "University of Delaware (2017)", "KU (2023)", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "d6e7f8",
    "category": "Disability Etiquette",
    "recommendation": "If a person is at a much lower height due to their disability or when they are seated (e.g., in a wheelchair), position yourself at their eye level for conversations by sitting in a chair or leaning against a wall a little further back, rather than standing over them; however, do not kneel during lengthy conversations.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 1", "University of Delaware (2017) Effective Communication for Healt, p. 36", "KU (2023) Notes on Disability Etiquette, p. 1"],
    "sourceTags": ["Northwest ADA Center (2020)", "University of Delaware (2017)", "KU (2023)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "g9h1i2",
    "category": "Disability Etiquette",
    "recommendation": "Even if an individual does not have an arm or hand, hold out your own for a handshake and follow their lead.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2"],
    "sourceTags": ["Northwest ADA Center (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "j3k4l5",
    "category": "Disability Etiquette",
    "recommendation": "Speak clearly and in a normal tone of voice, without exaggerating lip movements or speaking overly loudly, and always look at the individual when speaking.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2", "University of Delaware (2017) Effective Communication for Healt, p. 28", "University of Delaware (2017) Effective Communication for Healt, p. 32"],
    "sourceTags": ["Northwest ADA Center (2020)", "University of Delaware (2017)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "m6n7o8",
    "category": "Disability Etiquette",
    "recommendation": "Identify yourself when approaching or entering the room for a person who may not recognize your voice or has a visual impairment (e.g., \"Hi, Mary, it’s Dr. Smith here to do your exam\").",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2", "University of Delaware (2017) Effective Communication for Healt, p. 31"],
    "sourceTags": ["Northwest ADA Center (2020)", "University of Delaware (2017)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "p9q1r2",
    "category": "Disability Etiquette",
    "recommendation": "Inform an individual with a visual impairment if you are holding out an item to them, such as a pen.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2"],
    "sourceTags": ["Northwest ADA Center (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "s3t4u5",
    "category": "Disability Etiquette",
    "recommendation": "Assist an individual with a visual impairment in signing paperwork by placing a card or physical guide at the signature line so they can feel where to sign.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2"],
    "sourceTags": ["Northwest ADA Center (2020)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "v6w7x8",
    "category": "Disability Etiquette",
    "recommendation": "If offering physical assistance or guidance, first ask the individual if they would like help and wait for their acceptance before touching them or their assistive devices (e.g., cane). When offering guidance (e.g., to a person with vision loss), offer your arm for them to hold rather than grabbing their arm or cane, as they may need their arms for balance.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2", "University of Delaware (2017) Effective Communication for Healt, p. 12", "University of Delaware (2017) Effective Communication for Healt, p. 31", "University of Delaware (2017) Effective Communication for Healt, p. 36"],
    "sourceTags": ["Northwest ADA Center (2020)", "University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "y9z1a2",
    "category": "Disability Etiquette",
    "recommendation": "When working with a person who has an intellectual disability, ensure they understand their rights, the information being given, and what will happen at the meeting. If they do not understand due to the disability, ensure their parent or legal guardian is present and understands what is being said.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2"],
    "sourceTags": ["Northwest ADA Center (2020)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "b3c4d5",
    "category": "Disability Etiquette",
    "recommendation": "It is okay to use common, everyday phrases that might seem to relate to a person's disability, such as “Want to go for a walk?” to a wheelchair user, “Have you seen…?” to a blind individual, or “Did you hear about…?” to a deaf individual.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2"],
    "sourceTags": ["Northwest ADA Center (2020)"],
    "needTags": ["education"]
  },
  {
    "id": "e6f7g8",
    "category": "Disability Etiquette",
    "recommendation": "If you do not understand what an individual has said (e.g., due to a communication disorder or speech difficulty), do not pretend to understand; patiently and attentively ask them to repeat, rephrase, or write it down. For individuals with intellectual disabilities, ask clarifying questions. If the individual seems to have difficulty understanding you, be patient, repeat your message, and ask questions to ensure their comprehension.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2", "University of Delaware (2017) Effective Communication for Healt, p. 32", "University of Delaware (2017) Effective Communication for Healt, p. 35", "ADA National Network (2017) Accessible Health Care, p. 3"],
    "sourceTags": ["Northwest ADA Center (2020)", "University of Delaware (2017)", "ADA National Network (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "h9i1j2",
    "category": "Disability Etiquette",
    "recommendation": "Recognize that a service animal (including a guide dog) is a working animal, not a pet. Do not pet, talk to, touch, or otherwise distract a service animal without first asking the handler’s permission. When walking with a person who has a guide dog, walk on the side opposite the dog.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2", "University of Delaware (2017) Effective Communication for Healt, p. 31"],
    "sourceTags": ["Northwest ADA Center (2020)", "University of Delaware (2017)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "k3l4m5",
    "category": "Disability Etiquette",
    "recommendation": "Clearly explain all procedures, treatments, and exams to the patient beforehand and as many times as necessary, using verbal cues or models if needed, so the person knows what to expect.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 12", "University of Delaware (2017) Effective Communication for Healt, p. 31"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "n6o7p8",
    "category": "Disability Etiquette",
    "recommendation": "Recognize that the patient generally knows their needs and preferences best. Ask them about comfortable positions; preferred methods for transfer; if they need assistance (including for moving, undressing, dressing, cleaning up, or collecting samples); and what makes them most comfortable, accommodating these needs to the greatest extent possible.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 12", "University of Delaware (2017) Effective Communication for Healt, p. 38", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 19", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 7"],
    "sourceTags": ["University of Delaware (2017)", "CMS (2021)", "DREDF (2014)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "q9r1s2",
    "category": "Disability Etiquette",
    "recommendation": "Be aware that individuals with disabilities may be at a higher risk for abuse and neglect, sometimes from a caregiver.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 12"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["education"]
  },
  {
    "id": "t3u4v5",
    "category": "Disability Etiquette",
    "recommendation": "Before beginning an examination or substantive discussion, ask the patient if they wish any accompanying companion to remain in the room, as it is the patient's decision. Always provide an opportunity for the patient with a disability to speak with you alone.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 12", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3"],
    "sourceTags": ["University of Delaware (2017)", "ADA (2010)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "w6x7y8",
    "category": "Disability Etiquette",
    "recommendation": "Ask your patients with disabilities for regular feedback and suggestions to help you provide the best care possible.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 12"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "z9a1b2",
    "category": "Disability Etiquette",
    "recommendation": "If you are not sure if a patient's disability will impact communication, ask them; simple accommodations can often be made once communication needs are known.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 12"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "c3d4e5",
    "category": "Disability Etiquette",
    "recommendation": "You can speak or read information aloud to a patient who is blind or has low vision.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 13"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "f6g7h8",
    "category": "Disability Etiquette",
    "recommendation": "Use facial gestures, body language, pointing to information, or writing notes to communicate with a patient who is deaf or hard of hearing.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 13"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "i9j1k2",
    "category": "Disability Etiquette",
    "recommendation": "You can read notes written by a patient who has a speech disability, or read or listen to the words the patient selects on a “communication board.”",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 13"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money", "staff", "time", "education"]
  },
  {
    "id": "l3m4n5",
    "category": "Disability Etiquette",
    "recommendation": "Patients who are blind may need assistance in finding an item or in maneuvering through your office; offer such assistance.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 13"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "o6p7q8",
    "category": "Disability Etiquette",
    "recommendation": "Keep in mind that many people who have been deaf since birth may have limited literacy skills if the communication method you consider using relies on reading and/or writing.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 13"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["education"]
  },
  {
    "id": "r9s1t2",
    "category": "Disability Etiquette",
    "recommendation": "Use respectful, accurate, person-first language that supports self-esteem and helps eliminate prejudice; refer to the person first, not their disability (e.g., \"a person with a disability\" rather than \"a disabled person\").",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 14", "UCSM_Collecting Patients' Disability Status_Training materials, p. 16", "Health First Colorado_Best Practices Disability Competent Commu, p. 1"],
    "sourceTags": ["University of Delaware (2017)", "UCSM", "Health First Colorado"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "u3v4w5",
    "category": "Disability Etiquette",
    "recommendation": "Recognize that a person’s disability is only one part of them, not their defining characteristic; do not define a person by their diagnosis, treat them as an individual, and only refer to their disability if it is relevant to the conversation.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 14", "University of Delaware (2017) Effective Communication for Healt, p. 38"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["education"]
  },
  {
    "id": "x6y7z8",
    "category": "Disability Etiquette",
    "recommendation": "Use value-neutral language that does not have negative connotations (e.g., say \"a person who uses a wheelchair\" instead of \"wheelchair-bound\" or \"confined to a wheelchair\").",
    "sources": ["UCSM_Collecting Patients' Disability Status_Training materials, p. 17", "UCSM_Collecting Patients' Disability Status_Training materials, p. 18"],
    "sourceTags": ["UCSM"],
    "needTags": ["education"]
  },
  {
    "id": "a9b1c2",
    "category": "Disability Etiquette",
    "recommendation": "Avoid using negative, victimizing, or derogatory terms such as “victim,” “unfortunate,” “afflicted,” “crazy,” “wacko,” \"loony,\" “handicapped,” “crippled,” or “retarded.”",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 14", "University of Delaware (2017) Effective Communication for Healt, p. 38", "UCSM_Collecting Patients' Disability Status_Training materials, p. 18"],
    "sourceTags": ["University of Delaware (2017)", "UCSM"],
    "needTags": ["education"]
  },
  {
    "id": "d3e4f5",
    "category": "Disability Etiquette",
    "recommendation": "When referring to people without disabilities, use the term “people without disabilities” as opposed to “normal” or “able-bodied.” When referring to accessible features, use “accessible” (e.g., \"accessible parking\") instead of “handicapped.”",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 14", "University of Delaware (2017) Effective Communication for Healt, p. 16"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["education"]
  },
  {
    "id": "g6h7i8",
    "category": "Disability Etiquette",
    "recommendation": "To get the attention of a person who has a hearing impairment, gently tap the person on the shoulder.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 28"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "j9k1l2",
    "category": "Disability Etiquette",
    "recommendation": "Make sure you have a person's full attention before speaking, especially if they have a hearing impairment.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 28"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "m3n4o5",
    "category": "Disability Etiquette",
    "recommendation": "Ensure that an individual with a hearing impairment can always see your face, as your mouth and facial expressions carry helpful information.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 28"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "p6q7r8",
    "category": "Disability Etiquette",
    "recommendation": "Whenever possible, have conversations in a one-on-one setting without background noise, especially for those with hearing impairments.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 28"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "s9t1u2",
    "category": "Disability Etiquette",
    "recommendation": "Ensure good lighting is available and avoid any type of glare that can disturb vision, especially for those with hearing impairments who rely on visual cues.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 30"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money"]
  },
  {
    "id": "v3w4x5",
    "category": "Disability Etiquette",
    "recommendation": "If you leave a room where a patient with vision loss is, inform the person first. If leaving them alone in a room, orient them to the layout and any important landmarks (tables, doors, equipment).",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 31"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "y6z7a8",
    "category": "Disability Etiquette",
    "recommendation": "When interacting with people with communication disorders, give the person your undivided attention and maintain an encouraging rather than correcting manner.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 32"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "b9c1d2",
    "category": "Disability Etiquette",
    "recommendation": "If interacting with people with communication disorders, ask short questions that require brief answers or head nods, and make pen and paper available if useful.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 32"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "e3f4g5",
    "category": "Disability Etiquette",
    "recommendation": "Become familiar with and be patient with any communication devices patients with communication disorders may be using.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 32"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "h6i7j8",
    "category": "Disability Etiquette",
    "recommendation": "When interacting with individuals with intellectual/cognitive disabilities: allow plenty of time to teach new tasks; use repetition with precise, simple language; treat adults as adults and children as children; reduce distractions; use pictures/objects to convey meaning if appropriate; and allow \"wait time\" for processing and response.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 35"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "k9l1m2",
    "category": "Disability Etiquette",
    "recommendation": "Be aware that many people with cognitive/intellectual disabilities may try to give the answer they think you want to hear; phrase questions neutrally to get accurate information and verify responses by asking each question in a different way.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 35"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "n3o4p5",
    "category": "Disability Etiquette",
    "recommendation": "Always ask permission before moving a person’s assistive device, and if permission is granted, ask how it should be moved.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 36", "KU (2023) Notes on Disability Etiquette, p. 1"],
    "sourceTags": ["University of Delaware (2017)", "KU (2023)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "q6r7s8",
    "category": "Disability Etiquette",
    "recommendation": "Before transferring an individual who uses a wheelchair, always ask them the best way to transfer and ensure the wheelchair wheels are locked.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 36", "KU (2023) Notes on Disability Etiquette, p. 1"],
    "sourceTags": ["University of Delaware (2017)", "KU (2023)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "t9u1v2",
    "category": "Disability Etiquette",
    "recommendation": "Create an environment that builds on people’s strengths, promotes understanding, and is as stress-free as possible.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 38"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "w3x4y5",
    "category": "Disability Etiquette",
    "recommendation": "In a crisis situation, stay calm and supportive; ask the person how you can assist and try to identify their support person/system to involve them for help.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 38"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "z6a7b8",
    "category": "Disability Etiquette",
    "recommendation": "Encourage patients to inform staff about their needs at the start of appointments and to ask providers to make simple changes in interaction (e.g., for a blind patient, describing actions during an exam and giving verbal cues before touch).",
    "sources": ["HHS (2020) Getting the care you need_A guide for people with di, p. 7", "CMS (2022) Getting the Care You Need Guide for People with Disa, p. 4"],
    "sourceTags": ["HHS (2020)", "CMS (2022)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "c9d1e2",
    "category": "Disability Etiquette",
    "recommendation": "Encourage patients to inform their provider about any problems they are experiencing, offering options such as in-person discussion, writing, or phone calls if they are not comfortable speaking directly.",
    "sources": ["HHS (2020) Getting the care you need_A guide for people with di, p. 7"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "f3g4h5",
    "category": "Disability Etiquette",
    "recommendation": "Encourage patients who experience difficulties to inform the provider or office manager about the issues and discuss what staff can do to meet their needs.",
    "sources": ["HHS (2020) Getting the care you need_A guide for people with di, p. 8"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "i6j7k8",
    "category": "Disability Etiquette",
    "recommendation": "Listen carefully and respectfully to patients, trusting their beliefs about how their disability influences their life, and avoid preconceived notions about their abilities, as these can inhibit productive communication.",
    "sources": ["McClintock et al (2018) Health care access and quality for pers, p. 6", "McClintock et al (2018) Health care access and quality for pers, p. 7"],
    "sourceTags": ["McClintock et al (2018)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "l9m1n2",
    "category": "Disability Etiquette",
    "recommendation": "Engage patients conscientiously, ensuring adequate face-to-face time, and ask questions to co-construct a shared understanding of how they experience their disabilities.",
    "sources": ["McClintock et al (2018) Health care access and quality for pers, p. 6"],
    "sourceTags": ["McClintock et al (2018)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "o3p4q5",
    "category": "Disability Etiquette",
    "recommendation": "Ensure appointments allow adequate time for providers and patients to communicate effectively, so each party can understand the other.",
    "sources": ["McClintock et al (2018) Health care access and quality for pers, p. 6"],
    "sourceTags": ["McClintock et al (2018)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "r6s7t8",
    "category": "Disability Etiquette",
    "recommendation": "Consider home visits as a strategy for enhancing communication by directly observing how individuals with disabilities navigate their daily lives, obstacles, pain levels, and functional abilities.",
    "sources": ["McClintock et al (2018) Health care access and quality for pers, p. 6"],
    "sourceTags": ["McClintock et al (2018)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "u9v1w2",
    "category": "Disability Etiquette",
    "recommendation": "Use written notes for uncomplicated, short, or routine communication when appropriate.",
    "sources": ["ADA National Network (2017) Accessible Health Care, p. 3"],
    "sourceTags": ["ADA National Network (2017)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "x3y4z5",
    "category": "Disability Etiquette",
    "recommendation": "Allow more time to communicate with someone who uses a communication board or device.",
    "sources": ["ADA National Network (2017) Accessible Health Care, p. 3"],
    "sourceTags": ["ADA National Network (2017)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "a6b7c8",
    "category": "Disability Etiquette",
    "recommendation": "Encourage all staff to be fully on board and practice proper disability etiquette when interacting with people with disabilities.",
    "sources": ["Health First Colorado_10 Simple Steps for Disability Competent, p. 1"],
    "sourceTags": ["Health First Colorado"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "d9e1f2",
    "category": "Disability Etiquette",
    "recommendation": "When asking questions at the point of care, consider asking if the patient needs help undressing, dressing, cleaning up, or collecting a urine sample.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 19"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "g3h4i5",
    "category": "Disability Etiquette",
    "recommendation": "Train all staff members regularly in disability competency, including person-first language, treating assistive devices as personal space, and how to communicate in a disability-competent manner.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Commu, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 10"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "j6k7l8",
    "category": "Disability Etiquette",
    "recommendation": "Identify someone in the organization who is disability competent to provide ongoing oversight and coaching to others.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Commu, p. 1"],
    "sourceTags": ["Health First Colorado"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "m9n1o2",
    "category": "Disability Etiquette",
    "recommendation": "Always ask before you move a person who is in a wheelchair, both out of courtesy and to prevent disturbing their balance.",
    "sources": ["KU (2023) Notes on Disability Etiquette, p. 1"],
    "sourceTags": ["KU (2023)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "p3q4r5",
    "category": "Disability Etiquette",
    "recommendation": "If a person transfers from their wheelchair or uses other aids (like crutches or a walker), ensure these devices remain easily accessible to them.",
    "sources": ["KU (2023) Notes on Disability Etiquette, p. 1"],
    "sourceTags": ["KU (2023)"],
    "needTags": ["staff"]
  },
  {
    "id": "s6t7u8",
    "category": "Disability Etiquette",
    "recommendation": "Do not patronize people who use wheelchairs by actions such as patting them on the head; treat adults as adults.",
    "sources": ["KU (2023) Notes on Disability Etiquette, p. 1", "University of Delaware (2017) Effective Communication for Healt, p. 35"],
    "sourceTags": ["KU (2023)", "University of Delaware (2017)"],
    "needTags": ["education"]
  },
  {
    "id": "v9w1x2",
    "category": "Disability Etiquette",
    "recommendation": "While direct communication with the patient about their needs is often best, providers should not rely solely on this, especially for individuals new to disability who may not know their rights or available accommodations.",
    "sources": ["DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 7"],
    "sourceTags": ["DREDF (2014)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "y3z4a5",
    "category": "Disability Etiquette",
    "recommendation": "Providers and healthcare entities should proactively notify the public about disability rights and provide necessary accommodations and modifications to ensure equally effective healthcare experiences.",
    "sources": ["DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 7"],
    "sourceTags": ["DREDF (2014)"],
    "needTags": ["staff", "education"]
  },
  // =================================================================
  // == Physical Access
  // =================================================================
  {
    "id": "b6c7d8",
    "category": "Physical Access",
    "recommendation": "Ensure healthcare facilities are located to be accessible by public transportation, preferably within a quarter mile, or that other forms of accessible, non-emergency transportation are available.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Physi, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 26"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "e9f1g2",
    "category": "Physical Access",
    "recommendation": "Provide clearly marked, accessible parking spaces, including van-accessible spaces, in sufficient numbers (e.g., at least one accessible space for 25 or fewer total spaces, prorated for larger lots, with at least one van-accessible space per six accessible spaces), located closest to the accessible building entrance.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 11", "CMS (2017) Increasing the Physical Accessibility of Health Care, p. 4", "ADA National Network (2017) Accessible Health Care, p. 1", "UCSM_Collecting Patients' Disability Status_Training materials, p. 24", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 8", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 4", "DREDF (2014) Modules Improving Access to Health Care for People, p. 81", "DREDF (2014) Modules Improving Access to Health Care for People, p. 87", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 26", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 27"],
    "sourceTags": ["ADA (2016)", "CMS (2017)", "ADA National Network (2017)", "UCSM", "CMS (2021)", "Health First Colorado", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "h3i4j5",
    "category": "Physical Access",
    "recommendation": "Ensure accessible parking spaces and access aisles meet minimum width requirements and are identified by vertical signage with the International Symbol of Accessibility.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 11", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 26", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 27"],
    "sourceTags": ["ADA (2016)", "CMS (2021)", "Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "k6l7m8",
    "category": "Physical Access",
    "recommendation": "Provide an accessible drop-off and pick-up location with curb ramps if needed.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Physi, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 26"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "n9o1p2",
    "category": "Physical Access",
    "recommendation": "Ensure exterior accessible routes from parking, public transit, and public sidewalks to the building entrance are barrier-free (e.g., smooth pavement, clear of obstacles like debris or snow, no protruding objects) and include curb ramps where needed.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 14", "ADA (2016) ADA Checklist for Existing Facilities, p. 16", "University of Delaware (2017) Effective Communication for Healt, p. 24", "CMS (2017) Increasing the Physical Accessibility of Health Care, p. 4", "ADA National Network (2017) Accessible Health Care, p. 1", "Health First Colorado_10 Simple Steps for Disability Competent, p. 1", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 13", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 85", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 27"],
    "sourceTags": ["ADA (2016)", "University of Delaware (2017)", "CMS (2017)", "ADA National Network (2017)", "Health First Colorado", "CMS (2021)", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff"]
  },
  {
    "id": "q3r4s5",
    "category": "Physical Access",
    "recommendation": "If ramps are necessary for building access, ensure they have a maximum run of 30 feet between landings, are at least 36 inches wide, have landings at least 5x5 feet, and include handrails on both sides (34-38 inches high) if longer than 6 feet. Ramps should not have steep slopes.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 8", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 28", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 29"],
    "sourceTags": ["CMS (2021)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "t6u7v8",
    "category": "Physical Access",
    "recommendation": "Ensure building entrances are accessible, with a level landing in front of the door. If the main entrance is not accessible, provide an alternative accessible entrance with clear, legible directional signage.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 8", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 81", "DREDF (2014) Modules Improving Access to Health Care for People, p. 89", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 27"],
    "sourceTags": ["CMS (2021)", "Health First Colorado", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "w9x1y2",
    "category": "Physical Access",
    "recommendation": "Provide accessible interior routes of travel into and throughout buildings, ensuring hallways are at least 36 inches wide and kept clear of obstructions (e.g., boxes, equipment, chairs, trash cans, protruding objects like fire extinguishers or signs).",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 29", "University of Delaware (2017) Effective Communication for Healt, p. 36", "ADA National Network (2017) Accessible Health Care, p. 1", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 4", "DREDF (2014) Modules Improving Access to Health Care for People, p. 81", "DREDF (2014) Modules Improving Access to Health Care for People, p. 92", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 32", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 33"],
    "sourceTags": ["ADA (2016)", "University of Delaware (2017)", "ADA National Network (2017)", "CMS (2021)", "Health First Colorado", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "z3a4b5",
    "category": "Physical Access",
    "recommendation": "Ensure all interior and exterior doors (including to exam rooms and restrooms) have a minimum clear opening width of 32 inches when opened to 90 degrees, adequate maneuvering clearances on both sides (kept free of objects), and accessible hardware (e.g., levers, u-shaped handles) that does not require tight grasping, pinching, or twisting and can be operated with 5 pounds or less of force for interior doors. Consider power-assisted doors or doors with slower closing mechanisms.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 43", "CMS (2017) Increasing the Physical Accessibility of Health Care, p. 4", "ADA National Network (2017) Accessible Health Care, p. 1", "CDC (2013) What Healthcare Professionals Can Do to be Accessibl, p. 1", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 5", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 8", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 11", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 12", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 4", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 30", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 31", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 32", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 33", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 36", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 37", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 41", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["ADA (2016)", "CMS (2017)", "ADA National Network (2017)", "CDC (2013)", "ADA (2010)", "CMS (2021)", "Health First Colorado", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "c6d7e8",
    "category": "Physical Access",
    "recommendation": "Ensure thresholds at doorways are 1/4 inch high or less, or beveled if between 1/4 inch and 1/2 inch.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 11"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["money"]
  },
  {
    "id": "f9g1h2",
    "category": "Physical Access",
    "recommendation": "If stairs are present, provide handrails on both sides that extend horizontally at landings.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 8", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 32"],
    "sourceTags": ["CMS (2021)", "Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "i3j4k5",
    "category": "Physical Access",
    "recommendation": "If the building has multiple stories containing professional healthcare offices, provide an accessible elevator or chair lift that is independently operable.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 4", "DREDF (2014) Modules Improving Access to Health Care for People, p. 17", "DREDF (2014) Modules Improving Access to Health Care for People, p. 81", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 33"],
    "sourceTags": ["Health First Colorado", "DREDF (2014)", "CMS (2021)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "l6m7n8",
    "category": "Physical Access",
    "recommendation": "Ensure elevators have control panels and labels within reach of a seated person, visible and audible door opening/closing and floor indicators, Braille indicators on jambs and control buttons, and an emergency communication system usable without voice.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 82", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 33", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 34", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 35"],
    "sourceTags": ["Health First Colorado", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "o9p1q2",
    "category": "Physical Access",
    "recommendation": "Provide interior signage that is legible (appropriate size, simple sans-serif fonts, high contrast), mounted at an appropriate height for all to see. Signs designating permanent rooms (e.g., restrooms, room numbers, exits, emergency intercoms) should include raised letters and Braille and be located on the wall on the latch side of the door between 48-60 inches from the floor.",
    "sources": ["CMS (2017) Increasing the Physical Accessibility of Health Care, p. 4", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 4", "DREDF (2014) Modules Improving Access to Health Care for People, p. 82", "DREDF (2014) Modules Improving Access to Health Care for People, p. 89", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 32", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 35", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 38", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14"],
    "sourceTags": ["CMS (2017)", "Health First Colorado", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2021)"],
    "needTags": ["money"]
  },
  {
    "id": "r3s4t5",
    "category": "Physical Access",
    "recommendation": "Ensure controls such as light switches, security/intercom systems, emergency/alarm boxes, call buttons, self-service literature, and hand sanitizers are mounted at an accessible height (e.g., 15-48 inches from the floor) and are operable with one hand without grasping, pinching, or twisting.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 46", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 4", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 38", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14"],
    "sourceTags": ["ADA (2016)", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2021)"],
    "needTags": ["money"]
  },
  {
    "id": "u6v7w8",
    "category": "Physical Access",
    "recommendation": "Ensure alarm systems include visual as well as audio-based navigation beacons.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["money"]
  },
  {
    "id": "x9y1z2",
    "category": "Physical Access",
    "recommendation": "Ensure flooring is well-maintained, fixing loose seams and edges of carpeting, vinyl tiles, or linoleum.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 12"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["money", "staff"]
  },
  {
    "id": "a3b4c5",
    "category": "Physical Access",
    "recommendation": "Provide accessible drinking fountains and public telephones, low enough for individuals who use wheelchairs or are of short stature.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 84", "ADA (2016) ADA Checklist for Existing Facilities, p. 87", "ADA National Network (2017) Accessible Health Care, p. 1", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 10"],
    "sourceTags": ["ADA (2016)", "ADA National Network (2017)", "CMS (2021)"],
    "needTags": ["money"]
  },
  {
    "id": "d6e7f8",
    "category": "Physical Access",
    "recommendation": "Ensure reception areas and waiting rooms have adequate space for wheelchairs to maneuver and park without obstruction (e.g., a 30x48 inch space), including open space near the front desk. Remove chairs if necessary to create space.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 51", "Health First Colorado_10 Simple Steps for Disability Competent, p. 1", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 4", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 38", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["ADA (2016)", "Health First Colorado", "CMS (2021)", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money", "staff"]
  },
  {
    "id": "g9h1i2",
    "category": "Physical Access",
    "recommendation": "Provide a portion of the reception counter or sign-in desk that is no more than 34 inches high and at least 36 inches wide to accommodate wheelchair users.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 54", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 19", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 38", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["ADA (2016)", "CMS (2021)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "j3k4l5",
    "category": "Physical Access",
    "recommendation": "If using technology like touch screens for check-in, ensure they are height-adjustable or provide stations accessible to people who use wheelchairs or are unable to stand. Screens should also be accessible for those with limited dexterity or vision, or alternative options provided (e.g., screen readers, voice dictation, vibrating pagers for notification).",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 15", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["CMS (2021)", "CMS (2022)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "m6n7o8",
    "category": "Physical Access",
    "recommendation": "Ensure seating in general waiting areas, assembly areas, and at dining/work surfaces is accessible.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 47", "ADA (2016) ADA Checklist for Existing Facilities, p. 50", "ADA (2016) ADA Checklist for Existing Facilities, p. 51"],
    "sourceTags": ["ADA (2016)"],
    "needTags": ["money"]
  },
  {
    "id": "p9q1r2",
    "category": "Physical Access",
    "recommendation": "Ensure accessible routes to and unobstructed entrances (at least 32 inches wide) to restrooms, with accessible directional signage if not all restrooms are accessible.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 62", "ADA (2016) ADA Checklist for Existing Facilities, p. 64", "CMS (2017) Increasing the Physical Accessibility of Health Care, p. 4", "DREDF (2014) Modules Improving Access to Health Care for People, p. 82", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 15", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 38", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["ADA (2016)", "CMS (2017)", "DREDF (2014)", "CMS (2021)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "s3t4u5",
    "category": "Physical Access",
    "recommendation": "Design accessible restrooms with adequate maneuvering space for wheelchairs, including a 60-inch diameter or T-shaped turning circle within stalls or single-user restrooms.",
    "sources": ["ADA National Network (2017) Accessible Health Care, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 95", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 42", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["ADA National Network (2017)", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "v6w7x8",
    "category": "Physical Access",
    "recommendation": "Equip accessible toilets with seats 17-19 inches high, centered 16-18 inches from the side wall, and provide grab bars on the wall behind and next to the toilet.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 73", "ADA National Network (2017) Accessible Health Care, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 95", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 38", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 39", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["ADA (2016)", "ADA National Network (2017)", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "y9z1a2",
    "category": "Physical Access",
    "recommendation": "Ensure toilet paper dispensers are mounted below the side grab bar, with the centerline 7-9 inches in front of the toilet and at least 15 inches high.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 39"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "b3c4d5",
    "category": "Physical Access",
    "recommendation": "Provide accessible lavatories (sinks) with at least 30x48 inches of surrounding clear floor space, 17-25 inches of clear knee space underneath, and faucet handles operable with one hand without grasping, pinching, or twisting.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 70", "ADA National Network (2017) Accessible Health Care, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 95", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 40"],
    "sourceTags": ["ADA (2016)", "ADA National Network (2017)", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "e6f7g8",
    "category": "Physical Access",
    "recommendation": "Mount soap dispensers, hand dryers, towel dispensers, and specimen collection areas no higher than 40 inches from the floor and ensure they are operable with one hand without grasping, pinching, or twisting.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 71", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 40", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["ADA (2016)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "h9i1j2",
    "category": "Physical Access",
    "recommendation": "Ensure accessible toilet stalls are wide enough and have doors that open outward. In larger bathrooms (e.g., six or more stalls), provide a sufficient number of physically accessible stalls.",
    "sources": ["ADA (2016) ADA Checklist for Existing Facilities, p. 78", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 8", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 15", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["ADA (2016)", "CMS (2021)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "k3l4m5",
    "category": "Physical Access",
    "recommendation": "Ensure examination rooms are accessible via an accessible route, with an accessible entry door (at least 32 inches wide clear opening, adequate maneuvering clearance free of obstructions, accessible hardware).",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 4", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 5", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 11", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 15", "DREDF (2014) Modules Improving Access to Health Care for People, p. 97", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 43", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["ADA (2010)", "CMS (2021)", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "n6o7p8",
    "category": "Physical Access",
    "recommendation": "Provide adequate clear floor space within examination rooms for a person using a wheelchair or scooter to make a 180-degree turn (e.g., 60-inch diameter circle or T-shaped space) and to approach medical equipment.",
    "sources": ["ADA National Network (2017) Accessible Health Care, p. 2", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 5", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 11", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 44"],
    "sourceTags": ["ADA National Network (2017)", "ADA (2010)", "CMS (2021)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "q9r1s2",
    "category": "Physical Access",
    "recommendation": "Ensure a minimum clear floor space of 30x48 inches is provided adjacent to exam tables to allow for side transfers from a wheelchair. Preferably, provide this space on both sides of the table or use reverse furniture layouts in different accessible rooms.",
    "sources": ["ADA National Network (2017) Accessible Health Care, p. 2", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 5", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 6", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 11", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 43", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["ADA National Network (2017)", "ADA (2010)", "CMS (2021)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "t3u4v5",
    "category": "Physical Access",
    "recommendation": "Provide height-adjustable examination tables that can lower to wheelchair seat height (approximately 17-19 inches from the floor to the top of the cushion) and have an adequate transfer surface (minimum width of 28 inches and depth of 28 inches for side transfer).",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 36", "DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 5", "ADA National Network (2017) Accessible Health Care, p. 2 (Implied by transfer needs)", "NCD (2009) The Current State of Health Care for People with Dis, p. 98", "UCSM_Collecting Patients' Disability Status_Training materials, p. 24", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 7", "Health First Colorado_10 Simple Steps for Disability Competent, p. 1", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 11", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "KU (2023) Disability Resources for Healthcare Providers, p. 1", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 4", "DREDF (2014) Modules Improving Access to Health Care for People, p. 29", "DREDF (2014) Modules Improving Access to Health Care for People, p. 101", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 43", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["University of Delaware (2017)", "DREDF (2010)", "ADA National Network (2017)", "NCD (2009)", "UCSM", "ADA (2010)", "Health First Colorado", "CMS (2021)", "KU (2023)", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "w6x7y8",
    "category": "Physical Access",
    "recommendation": "Equip accessible exam tables with transfer supports (e.g., handles, removable/adjustable support rails with continuous gripping surfaces), head and back supports, and elements to stabilize and support a person during transfer and while on the table (e.g., armrests, padded straps, stabilization cushions, wedges, rolled towels, pillows). The exam surface may need to articulate or tilt.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 7", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 8", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 9", "KU (2023) Disability Resources for Healthcare Providers, p. 1", "KU (2023) Disability Resources for Healthcare Providers, p. 2", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 43", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["ADA (2010)", "KU (2023)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money"]
  },
  {
    "id": "z9a1b2",
    "category": "Physical Access",
    "recommendation": "Provide patient lift equipment (e.g., portable floor lifts, overhead track lifts - ceiling mounted or free-standing) for staff to use to transfer patients onto exam tables when needed, ensuring sufficient clear floor space for lift operation if using portable lifts.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 5", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 9", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 10", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 11", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 29", "DREDF (2014) Modules Improving Access to Health Care for People, p. 101", "DREDF (2014) Modules Improving Access to Health Care for People, p. 102", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 44", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["DREDF (2010)", "ADA (2010)", "Health First Colorado", "DREDF (2014)", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "c3d4e5",
    "category": "Physical Access",
    "recommendation": "For specialized examinations (e.g., gynecological), provide accessible height exam tables with appropriate adjustable supports (e.g., padded leg supports instead of typical stirrups) and consider tables that tilt.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 7", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 16", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 45"],
    "sourceTags": ["ADA (2010)", "CMS (2021)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "f6g7h8",
    "category": "Physical Access",
    "recommendation": "Ensure diagnostic equipment (e.g., mammography, X-ray, CT scan, ultrasound, infusion chairs, optometry chairs) is accessible, including being height-adjustable, accommodating wheelchairs (sufficient knee/toe clearance), and not solely reliant on patients independently standing or holding positions. Provide supports like Velcro straps for patients with limited limb control if needed.",
    "sources": ["CMS (2017) Increasing the Physical Accessibility of Health Care, p. 4", "ADA National Network (2017) Accessible Health Care, p. 2", "CDC (2013) What Healthcare Professionals Can Do to be Accessibl, p. 1", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 12", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 13", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 11", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 16", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 4", "DREDF (2014) Modules Improving Access to Health Care for People, p. 29", "DREDF (2014) Modules Improving Access to Health Care for People, p. 101", "DREDF (2014) Modules Improving Access to Health Care for People, p. 102", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 45"],
    "sourceTags": ["CMS (2017)", "ADA National Network (2017)", "CDC (2013)", "ADA (2010)", "CMS (2021)", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "i9j1k2",
    "category": "Physical Access",
    "recommendation": "Provide accessible weight scales with a platform large enough to accommodate a wheelchair or scooter and the person, with a high weight capacity. Options include scales integrated into patient lifts, hospital beds, or exam tables.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 5", "ADA National Network (2017) Accessible Health Care, p. 2", "NCD (2009) The Current State of Health Care for People with Dis, p. 98", "UCSM_Collecting Patients' Disability Status_Training materials, p. 24", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 13", "Health First Colorado_10 Simple Steps for Disability Competent, p. 1", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "KU (2023) Disability Resources for Healthcare Providers, p. 1", "KU (2023) Disability Resources for Healthcare Providers, p. 2", "DREDF (2014) Modules Improving Access to Health Care for People, p. 29", "DREDF (2014) Modules Improving Access to Health Care for People, p. 101", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 45"],
    "sourceTags": ["DREDF (2010)", "ADA National Network (2017)", "NCD (2009)", "UCSM", "ADA (2010)", "Health First Colorado", "KU (2023)", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["money"]
  },
  {
    "id": "l3m4n5",
    "category": "Physical Access",
    "recommendation": "Provide space between exam tables and walls to allow staff members to assist with patient transfers and positioning from both sides if possible.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 6", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 16", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["ADA (2010)", "CMS (2021)", "CMS (2022)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "o6p7q8",
    "category": "Physical Access",
    "recommendation": "Consider clinic room size when implementing height-adjustable examination tables, as they might be wider and require more height clearance than stationary tables.",
    "sources": ["Maragh-Bass et al (2018) Healthcare provider perceptions of acc, p. 5"],
    "sourceTags": ["Maragh-Bass et al (2018)"],
    "needTags": ["money"]
  },
  {
    "id": "r9s1t2",
    "category": "Physical Access",
    "recommendation": "Allow people with disabilities who use wheelchairs (manual, power, scooters) and manually-powered mobility aids (walkers, crutches, canes, braces) into all areas of a facility where members of the public are allowed to go.",
    "sources": ["ADA (2014) ADA Requirements_ Wheelchairs, Mobility Aids"],
    "sourceTags": ["ADA (2014)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "u3v4w5",
    "category": "Physical Access",
    "recommendation": "Allow people with disabilities who use Other Power-Driven Mobility Devices (OPDMDs, e.g., Segways®) to enter the premises unless a particular type of device cannot be accommodated due to legitimate safety requirements; Segways® are expected to be accommodated in most circumstances.",
    "sources": ["ADA (2014) ADA Requirements_ Wheelchairs, Mobility Aids"],
    "sourceTags": ["ADA (2014)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "x6y7z8",
    "category": "Physical Access",
    "recommendation": "Do not deny medical care or services because buildings, examination rooms, or equipment are not accessible. If a patient must be lying down to be thoroughly examined, then a person with a disability must also be examined lying down, implying provision of accessible means.",
    "sources": ["HHS (2020) Getting the care you need_A guide for people with di, p. 4", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 7"],
    "sourceTags": ["HHS (2020)", "ADA (2010)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "a9b1c2",
    "category": "Physical Access",
    "recommendation": "Remove architectural barriers in existing facilities where such removal is readily achievable (i.e., easily accomplishable and able to be carried out without much difficulty or expense). If barrier removal is not readily achievable, adopt alternative measures, such as relocating activities to accessible locations.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 2", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3", "DREDF (2014) Modules Improving Access to Health Care for People, p. 18"],
    "sourceTags": ["ADA (2010)", "DREDF (2014)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "d3e4f5",
    "category": "Physical Access",
    "recommendation": "When planning meetings or any activities (breaks, off-site tours, social events), ensure the facility (including parking, pathways, restrooms) and the meeting room itself (including seating) meet basic accessibility standards (ADA requirements) and are free of physical barriers to allow participation by people with a variety of disabilities.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 24"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "g6h7i8",
    "category": "Physical Access",
    "recommendation": "Arrange for the use of the most accessible exam room, equipment, or other facilities when required by a person with a disability. Office staff must appropriately schedule the use of accessible rooms, equipment, and trained staff to ensure availability.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 5", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 5"],
    "sourceTags": ["DREDF (2010)", "DREDF (2014)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "j9k1l2",
    "category": "Physical Access",
    "recommendation": "Provide reasonable assistance to patients with disabilities to enable them to receive medical care, which may include helping with undressing, dressing, getting on/off exam tables or equipment, and maintaining balance or positioning on the table. Ask the patient if assistance is needed and how best to help.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 8", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 9"],
    "sourceTags": ["ADA (2010)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "m3n4o5",
    "category": "Physical Access",
    "recommendation": "Assess the accessibility of the healthcare setting at every point of a patient's visit, from arrival to departure, considering barriers encountered in approach, entrance, navigating within the building and provider's office (check-in, clinical exam, restrooms). Use checklists as a starting point for evaluation.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 9", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 2"],
    "sourceTags": ["CMS (2021)", "CMS (2022)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "p6q7r8",
    "category": "Physical Access",
    "recommendation": "Consider logistical implications and scheduling strategies when determining the number and placement of accessible exam tables (e.g., all tables vs. select rooms with accessible tables).",
    "sources": ["Maragh-Bass et al (2018) Healthcare provider perceptions of acc, p. 5", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3"],
    "sourceTags": ["Maragh-Bass et al (2018)", "ADA (2010)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "s9t1u2",
    "category": "Physical Access",
    "recommendation": "Consult with or establish relationships with other practices, advocacy groups, local disability organizations, or other community groups for technical information, product reviews, and potential funding sources for accessibility improvements. Consider pooling resources with other providers to purchase or share expensive accessible equipment.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 5", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 22", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 23"],
    "sourceTags": ["DREDF (2010)", "CMS (2021)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "v3w4x5",
    "category": "Physical Access",
    "recommendation": "Ensure that tenants and landlords understand their respective responsibilities for complying with ADA accessibility requirements for both private and common spaces.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 4"],
    "sourceTags": ["ADA (2010)"],
    "needTags": ["education"]
  },
  // =================================================================
  // == Policy and Procedural Access
  // =================================================================
  {
    "id": "y6z7a8",
    "category": "Policy and Procedural Access",
    "recommendation": "Establish policies ensuring that all treatment decisions, including resource allocation during shortages, are based on a thorough, individualized assessment of each patient using current and best available objective medical evidence and their ability to respond to treatment.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 2", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 3", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 4", "HHS (2020) Bulletin- Civil Rights, HIPAA"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "b9c1d2",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure treatment allocation decisions are not based on assumptions about quality of life, relative 'worth', or prognosis due to a patient's disability, age, or specific diagnosis (e.g., intellectual disability, autism, cystic fibrosis, HIV/AIDS, spina bifida, schizophrenia).",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 2", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 3", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 4", "HHS (2020) Bulletin- Civil Rights, HIPAA"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "e3f4g5",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure treatment allocation decisions are not based on stereotypes that a person’s disability will require the use of greater treatment resources, either in the short or long term.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 2", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 3", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 4", "HHS (2020) Bulletin- Civil Rights, HIPAA"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "h6i7j8",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure treatment allocation decisions are not based on value judgments about a patient's need for support in activities of daily living, use of augmentative or alternative communication, use of a wheelchair, or experience of a psychiatric disability.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 2", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 3", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 4", "HHS (2020) Bulletin- Civil Rights, HIPAA"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "k9l1m2",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure resource or service allocation decisions during public health emergencies are not based on social characteristics, including but not limited to race, ethnicity, gender, national origin, sexual orientation, religious affiliation, and disability unrelated to near-term survival.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 2", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 3", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 4", "HHS (2020) Bulletin- Civil Rights, HIPAA"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "n3o4p5",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure treatment allocation decisions are not based on protocols that equate survival solely with “health” or the absence of chronically debilitating symptoms.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 2", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 3", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 4", "HHS (2020) Bulletin- Civil Rights, HIPAA"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "q6r7s8",
    "category": "Policy and Procedural Access",
    "recommendation": "Develop policies prohibiting the reallocation of personal ventilators from individuals with disabilities who use them in daily life; these individuals should be allowed to continue using their personal equipment if hospitalized.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 2"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "t9u1v2",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure that any plans for allocating scarce medical resources during shortages are made publicly available, widely distributed to stakeholders (including disability organizations), and include an explained and available appeal process for all patients.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 2", "(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 3"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "w3x4y5",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement policies to ensure patients with disabilities are not refused service or made to wait longer than other patients simply because they have a disability.",
    "sources": ["HHS (2020) Getting the care you need_A guide for people with di, p. 6", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3"],
    "sourceTags": ["HHS (2020)", "ADA (2010)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "z6a7b8",
    "category": "Policy and Procedural Access",
    "recommendation": "Do not refuse to treat a patient with a disability just because the examination or care might take more of the provider's or staff's time.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3"],
    "sourceTags": ["ADA (2010)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "c9d1e2",
    "category": "Policy and Procedural Access",
    "recommendation": "Establish policies for protecting staff from injury through the provision of accessible equipment and proper training, rather than by refusing to provide equal medical services to individuals with disabilities.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 4"],
    "sourceTags": ["ADA (2010)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "f3g4h5",
    "category": "Policy and Procedural Access",
    "recommendation": "Develop written policies specifying which kinds of Other Power-Driven Mobility Devices (OPDMDs) will be permitted, where, and when, based on legitimate assessment factors.",
    "sources": ["ADA (2014) ADA Requirements_ Wheelchairs, Mobility Aids"],
    "sourceTags": ["ADA (2014)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "i6j7k8",
    "category": "Policy and Procedural Access",
    "recommendation": "Establish and implement policies for the reasonable modification of standard policies, practices, and procedures when necessary to provide effective treatment and care for people with disabilities, unless it fundamentally alters the nature of the services or causes an undue burden.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 4", "DREDF (2014) Modules Improving Access to Health Care for People, p. 30", "DREDF (2014) Modules Improving Access to Health Care for People, p. 115"],
    "sourceTags": ["DREDF (2010)", "DREDF (2014)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "l9m1n2",
    "category": "Policy and Procedural Access",
    "recommendation": "Develop policies and procedures for programmatic access covering: effective communication, appointment scheduling and time, patient treatment by medical staff, selection and purchasing of accessible equipment, staff training, referral standards, system-wide coordination, and disability cultural awareness.",
    "sources": ["DREDF (2014) Modules Improving Access to Health Care for People, p. 116"],
    "sourceTags": ["DREDF (2014)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "o3p4q5",
    "category": "Policy and Procedural Access",
    "recommendation": "Establish clear policies and procedures for providing accommodations, including auxiliary aids and services, and ensure patients are informed of their right to request accommodations/modifications, the process for doing so, and how to file complaints if needs are not met.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 11", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 6"],
    "sourceTags": ["DREDF (2010)", "DREDF (2014)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "r6s7t8",
    "category": "Policy and Procedural Access",
    "recommendation": "Designate a lead staff person responsible for arranging accommodations and overseeing the implementation of accessibility policies.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 5", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 11"],
    "sourceTags": ["DREDF (2010)", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff"]
  },
  {
    "id": "u9v1w2",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement policies to ensure service animals (dogs, and miniature horses where reasonable) are permitted in healthcare facilities, including patient rooms and examination areas, except where their presence may compromise a sterile environment (e.g., operating rooms). Policies should also address removal if the animal is not well-behaved or under control.",
    "sources": ["Northwest ADA Center (2020) Disability Language and Etiquette_H, p. 2", "HHS (2020) Getting the care you need_A guide for people with di, p. 5", "DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 4", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 6", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "DREDF (2014) Modules Improving Access to Health Care for People, p. 106 - 107", "DREDF (2014) Modules Improving Access to Health Care for People, p. 119"],
    "sourceTags": ["Northwest ADA Center (2020)", "HHS (2020)", "DREDF (2010)", "DREDF (2014)", "Health First Colorado"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "x3y4z5",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure policies and procedures are in place to offer people with disabilities full and equal access to Electronic Information Technology (EIT) or provide reasonable accommodations/modifications for its use.",
    "sources": ["HHS (2016) Guidance and Resources for Electronic Information Te, p. 2"],
    "sourceTags": ["HHS (2016)"],
    "needTags": ["money", "staff", "education"]
  },
  {
    "id": "a6b7c8",
    "category": "Policy and Procedural Access",
    "recommendation": "Develop and implement grievance procedures for patients with disabilities regarding disputes about accommodations, and ensure patients are informed of this policy.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 11", "DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 12"],
    "sourceTags": ["DREDF (2010)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "d9e1f2",
    "category": "Policy and Procedural Access",
    "recommendation": "Stock facilities with items that help people maintain independence, such as hearing aid batteries, canes, and walkers.",
    "sources": ["HHS (2020) Bulletin- Civil Rights, HIPAA"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["money"]
  },
  {
    "id": "g3h4i5",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement a standard policy to routinely ask all patients (e.g., when scheduling appointments, during registration/RSVP, on intake forms, or at each visit) if they have any special needs or will require an accommodation due to a disability.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 14", "University of Delaware (2017) Effective Communication for Healt, p. 24", "University of Delaware (2017) Effective Communication for Healt, p. 27", "University of Delaware (2017) Effective Communication for Healt, p. 28", "University of Delaware (2017) Effective Communication for Healt, p. 30", "HHS (2020) Getting the care you need_A guide for people with di, p. 7", "HHS (2020) Getting the care you need_A guide for people with di, p. 10", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 18", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 20", "Health First Colorado_Best Practices Disability Competent Commu, p. 1", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 3"],
    "sourceTags": ["University of Delaware (2017)", "HHS (2020)", "ADA (2010)", "CMS (2021)", "Health First Colorado", "CMS (2022)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "j6k7l8",
    "category": "Policy and Procedural Access",
    "recommendation": "Use specific questions during scheduling or on intake forms to identify needs for assistance (e.g., with transfers, dressing, forms), auxiliary aids, extra appointment time, or a care coordinator.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 18", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 19", "Health First Colorado_10 Simple Steps for Disability Competent, p. 1"],
    "sourceTags": ["CMS (2021)", "Health First Colorado"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "m9n1o2",
    "category": "Policy and Procedural Access",
    "recommendation": "Document identified accommodation needs (e.g., using an Accommodations Checksheet or specific fields) in a visible, permanent location in the patient’s medical record (EHR), and use alerts or flags to ensure staff are cued to these needs before and during appointments.",
    "sources": ["CMS (2017) Increasing the Physical Accessibility of Health Care, p. 8", "DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 11", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 18", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 20", "Health First Colorado_Best Practices Disability Competent Commu, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 10", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 11"],
    "sourceTags": ["CMS (2017)", "DREDF (2010)", "ADA (2010)", "CMS (2021)", "Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "p3q4r5",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure all healthcare team members are aware if a patient has a disability so accommodations can be made by everyone involved in their care.",
    "sources": ["UCSM_Collecting Patients' Disability Status_Training materials, p. 8"],
    "sourceTags": ["UCSM"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "s6t7u8",
    "category": "Policy and Procedural Access",
    "recommendation": "Obtain information about accommodation needs from the patient where possible, or from their personal assistant, caregiver, or other designated person, or with staff assistance, ensuring privacy.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 11"],
    "sourceTags": ["DREDF (2010)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "v9w1x2",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement policies and procedures to schedule longer or flexible appointment times for patients who require it due to communication needs, transfer/positioning assistance, cognitive/intellectual disabilities, or reliance on paratransit.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 7", "NCD (2009) The Current State of Health Care for People with Dis, p. 98", "UCSM_Collecting Patients' Disability Status_Training materials, p. 26", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 6", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 12", "DREDF (2014) Modules Improving Access to Health Care for People, p. 30", "DREDF (2014) Modules Improving Access to Health Care for People, p. 103", "DREDF (2014) Modules Improving Access to Health Care for People, p. 104", "DREDF (2014) Modules Improving Access to Health Care for People, p. 118 - 119", "DREDF (2014) Modules Improving Access to Health Care for People, p. 119"],
    "sourceTags": ["DREDF (2010)", "NCD (2009)", "UCSM", "DREDF (2014)", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "y3z4a5",
    "category": "Policy and Procedural Access",
    "recommendation": "If a patient with a disability has made an appointment in advance, staff should reserve the room with the accessible exam table or other necessary equipment for that patient's appointment. If this becomes difficult, consider acquiring additional accessible equipment.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 3", "DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 5"],
    "sourceTags": ["ADA (2010)", "DREDF (2014)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "b6c7d8",
    "category": "Policy and Procedural Access",
    "recommendation": "Establish policies to allow patients who may not be able to tolerate waiting in a reception area (e.g., due to cognitive, intellectual, or psychiatric disabilities like anxiety) to be seen immediately upon arrival or to have appointments scheduled at specific times to minimize waiting.",
    "sources": ["DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 6", "DREDF (2014) Modules Improving Access to Health Care for People, p. 118 - 119"],
    "sourceTags": ["DREDF (2014)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "e9f1g2",
    "category": "Policy and Procedural Access",
    "recommendation": "Develop protocols for what to do when a patient with a disability arrives and needs an accommodation that was not planned in advance, including how to respond safely and find/use accessible equipment or arrange interpretation.",
    "sources": ["CMS (2022) How to Improve Physical Accessibility at Your Health, p. 4"],
    "sourceTags": ["CMS (2022)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "h3i4j5",
    "category": "Policy and Procedural Access",
    "recommendation": "Embrace patient-centered care as the practice framework, including patients in the development of their medical plan, considering their goals, values, and healthcare preferences, and adhering to the agreed-upon plan.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Progr, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 16"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "k6l7m8",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement an Interdisciplinary Team (IDT) approach for care management, with core competencies in primary care, behavioral health, long-term services and supports (LTSS), and nursing, ensuring close communication within the team and with the patient.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 16", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 17", "Health First Colorado_Best Practices Disability Competent Progr, p. 1"],
    "sourceTags": ["Colorado Dept HCPF (2019)", "Health First Colorado"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "n9o1p2",
    "category": "Policy and Procedural Access",
    "recommendation": "Designate one IDT member as the lead with final responsibility and accountability for each individual participant's IDT and Individualized Plan of Care (IPC).",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 17"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff"]
  },
  {
    "id": "q3r4s5",
    "category": "Policy and Procedural Access",
    "recommendation": "Allow participants to designate a family member, close friend, or caregiver to be involved in IDT-related communications.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 17"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "t6u7v8",
    "category": "Policy and Procedural Access",
    "recommendation": "Conduct comprehensive, multidimensional initial assessments for all new patients with disabilities and annual follow-up assessments (or upon significant change in status), covering strengths, goals, medical history, functional status (ADLs/IADLs), behavioral health, service use, health risks, and community participation.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Progr, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 17", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 18"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "w9x1y2",
    "category": "Policy and Procedural Access",
    "recommendation": "Develop Individualized Plans of Care (IPCs) for all participants, including their goals, action steps, interventions with timeframes and accountability, and documentation of all care, services, and supports being provided (by whom and when). Ensure IPCs are living documents, referenced and revised based on changing needs, and that the IDT can modify them accordingly.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 18", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 19"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "z3a4b5",
    "category": "Policy and Procedural Access",
    "recommendation": "Establish practices for ongoing IPC oversight and coordination to ensure effectiveness, implementation of preventive strategies, and timely revisions.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 19"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "c6d7e8",
    "category": "Policy and Procedural Access",
    "recommendation": "Establish protocols for managing patient transitions in various contexts (e.g., change in medical institution, living situation, caregiver, health status).",
    "sources": ["Health First Colorado_Best Practices Disability Competent Progr, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 19"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "f9g1h2",
    "category": "Policy and Procedural Access",
    "recommendation": "Encourage patients to have advance directives (e.g., living will) and routinely engage them in discussions about their desire for a care partner to assist with complex needs, appointments, and care plan adherence.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 19", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 20"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "i3j4k5",
    "category": "Policy and Procedural Access",
    "recommendation": "Maintain a centralized, comprehensive health record for each participant, accessible to all members of their IDT and coverage staff, ideally with 24/7 access.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Progr, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 20", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 21"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff"]
  },
  {
    "id": "l6m7n8",
    "category": "Policy and Procedural Access",
    "recommendation": "Establish practices for medication management, including assessing needs, addressing polypharmacy, monitoring compliance, with the PCP on the IDT often assuming responsibility.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Progr, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 15"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "o9p1q2",
    "category": "Policy and Procedural Access",
    "recommendation": "Build an organized network of specialists experienced in serving individuals with disabilities and ensure PCPs have access to this network.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Progr, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 14"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "r3s4t5",
    "category": "Policy and Procedural Access",
    "recommendation": "Set clinical protocols for the identification and treatment of common secondary conditions associated with disability (e.g., skin breakdown, UTIs, depression).",
    "sources": ["Health First Colorado_Best Practices Disability Competent Progr, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 14"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "u6v7w8",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure PCPs are available 24/7 for diagnosis and treatment and can provide care in community settings (clinic, urgent care, place of residence), possibly utilizing home visits or NP coverage.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 14", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 15"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "x9y1z2",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement practices for mobility and seating assessments, ensuring participants have access to customized equipment and modifications.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 22"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff", "time", "education"]
  },
  {
    "id": "a3b4c5",
    "category": "Policy and Procedural Access",
    "recommendation": "Maintain an adequate network of durable medical equipment (DME) providers to ensure choice and timely access, and implement practices for timely DME repair with backup options.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 22"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "d6e7f8",
    "category": "Policy and Procedural Access",
    "recommendation": "Offer participants a choice between agency-model and self-directed models for their personal care attendants.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 23"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "g9h1i2",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement practices for emergency and caregiver backup plans, covering actions in emergencies and coverage for unexpected caregiver unavailability.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 23"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "j3k4l5",
    "category": "Policy and Procedural Access",
    "recommendation": "Provide participants a reasonable choice of providers and settings of care, especially since care is often attached to the residential setting.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 23"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "m6n7o8",
    "category": "Policy and Procedural Access",
    "recommendation": "Assess and address participant transportation needs at least annually, specifying equipment and assistance needed in the IPC, and provide support/training in the use of transportation services.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 23", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 24"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff", "time", "education"]
  },
  {
    "id": "p9q1r2",
    "category": "Policy and Procedural Access",
    "recommendation": "Allow participants to maintain existing relationships with LTSS providers when feasible, potentially offering an out-of-network option during transitions.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 24"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "s3t4u5",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure adequate network capacity for the full range of needed LTSS, hiring or contracting with providers if necessary, and have the capacity to develop specific services not readily available in the community if specified in an IPC.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 24", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 25"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "v6w7x8",
    "category": "Policy and Procedural Access",
    "recommendation": "Modify standard rehabilitation program admission requirements or procedures for patients with chronic conditions and complex treatment regimens.",
    "sources": ["DREDF (2014) Disability Rights and Managed Care Fact Sheet, p. 6"],
    "sourceTags": ["DREDF (2014)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "y9z1a2",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure a steady two-way flow of detailed medical information between Emergency Departments (EDs) and other healthcare providers.",
    "sources": ["Rasch et al (2013) Use of Emergency Departments among Working A, p. 21"],
    "sourceTags": ["Rasch et al (2013)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "b3c4d5",
    "category": "Policy and Procedural Access",
    "recommendation": "Refer patients to another provider only for established medical reasons or specialized expertise, and take steps to ensure referred venues (labs, testing facilities, specialists) are accessible.",
    "sources": ["DREDF (2014) Modules Improving Access to Health Care for People, p. 122"],
    "sourceTags": ["DREDF (2014)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "e6f7g8",
    "category": "Policy and Procedural Access",
    "recommendation": "Make information about accessibility features and policies available on the practice's website in an easy-to-find location, and ensure the website is ADA Section 508 compliant (or meets WCAG 2.0 AA).",
    "sources": ["Health First Colorado_Best Practices Disability Competent Commu, p. 1", "Health First Colorado_Best Practices Disability Competent Physi, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 12"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["money", "staff", "time", "education"]
  },
  {
    "id": "h9i1j2",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure all patient materials, signage, and documents (including those for medical records) are culturally and linguistically appropriate, easily understood (e.g., at a sixth-grade literacy level), and address the needs of patients with disabilities.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 19", "Health First Colorado_Best Practices Disability Competent Commu, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 21"],
    "sourceTags": ["CMS (2021)", "Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "k3l4m5",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement policies to provide written summaries of appointments if needed.",
    "sources": ["UCSM_Collecting Patients' Disability Status_Training materials, p. 26"],
    "sourceTags": ["UCSM"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "n6o7p8",
    "category": "Policy and Procedural Access",
    "recommendation": "Use multiple outlets and resources for messaging to reach diverse populations, including individuals with disabilities.",
    "sources": ["HHS (2020) Bulletin- Civil Rights, HIPAA"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["money", "staff"]
  },
  {
    "id": "q9r1s2",
    "category": "Policy and Procedural Access",
    "recommendation": "Consider using universally recognized symbols (e.g., wheelchair symbol, information symbol) on signage and materials to indicate access to information or accessible features.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 13", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 14"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["money", "education"]
  },
  {
    "id": "t3u4v5",
    "category": "Policy and Procedural Access",
    "recommendation": "Periodically reassess the facility and procedures for accessibility barriers that remain or have been inadvertently reintroduced.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 24 - 25"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "w6x7y8",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement a continuous quality improvement workflow for accessibility that includes: assessing facility and patient needs, identifying resources, developing action plans and timelines, implementing solutions, monitoring impact, and making adjustments.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 24 - 25"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "z9a1b2",
    "category": "Policy and Procedural Access",
    "recommendation": "Regularly check in with patients about whether their needs are being met and solicit suggestions, and check with staff about scheduling processes and documenting patient needs.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 25"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "c3d4e5",
    "category": "Policy and Procedural Access",
    "recommendation": "Monitor whether the practice is actively using information collected from patients to improve their experiences and make improvements if not.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 25"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "f6g7h8",
    "category": "Policy and Procedural Access",
    "recommendation": "Stratify collected patient data by disability status to identify and explore potential quality of care issues (e.g., missed preventive screenings) and target efforts for improvement.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 20"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "i9j1k2",
    "category": "Policy and Procedural Access",
    "recommendation": "Clearly communicate responsibilities among staff for meeting patient accommodation requests in a timely manner.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Commu, p. 1"],
    "sourceTags": ["Health First Colorado"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "l3m4n5",
    "category": "Policy and Procedural Access",
    "recommendation": "Encourage staff to welcome patients with obvious disabilities and proactively discuss how to solve accessibility issues.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 13"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "o6p7q8",
    "category": "Policy and Procedural Access",
    "recommendation": "Consider system-wide policies and coordination to provide flexibility or creative solutions for healthcare delivery when services may need to be delivered in atypical venues or ways.",
    "sources": ["DREDF (2014) Modules Improving Access to Health Care for People, p. 123"],
    "sourceTags": ["DREDF (2014)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "r9s1t2",
    "category": "Policy and Procedural Access",
    "recommendation": "Conduct regular maintenance on patient lifts, keep a variety of sling sizes, and ensure staff are aware of where lifts are stored.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 17"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["money", "staff", "time", "education"]
  },
  {
    "id": "u3v4w5",
    "category": "Policy and Procedural Access",
    "recommendation": "Obtain input from individuals with disabilities when identifying changes needed to administrative procedures.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 17"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "x6y7z8",
    "category": "Policy and Procedural Access",
    "recommendation": "Explain the practice's accommodation policy in welcome letters for new patients or make it available in provider directories.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 20"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "a9b1c2",
    "category": "Policy and Procedural Access",
    "recommendation": "Use accessible kiosks and mobile devices as tools for collecting information about needed accommodations directly from patients in a clinical setting.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 20"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["money"]
  },
  {
    "id": "d3e4f5",
    "category": "Policy and Procedural Access",
    "recommendation": "Negotiate with payers for alternative payment approaches to cover the costs of extended visits that may be necessary to provide comprehensive evaluations for patients with disabilities.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 23"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["money", "staff", "time"]
  },
  {
    "id": "g6h7i8",
    "category": "Policy and Procedural Access",
    "recommendation": "Ensure there is sufficient primary care capacity and properly trained staff to serve enrolled members with disabilities in a timely and responsive manner.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 13", "Health First Colorado_Best Practices Disability Competent Progr, p. 1"],
    "sourceTags": ["Colorado Dept HCPF (2019)", "Health First Colorado"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "j9k1l2",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement practices for timely and routine communication between primary care and behavioral health practitioners.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 14"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time"]
  },
  {
    "id": "m3n4o5",
    "category": "Policy and Procedural Access",
    "recommendation": "Provide clients and caregivers/personal care assistants with health promotion and self-care education specific to their needs, incorporating a health and wellness plan into the IPC.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 15"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "p6q7r8",
    "category": "Policy and Procedural Access",
    "recommendation": "Implement policies to provide assistance filling out forms for those who need it.",
    "sources": ["DREDF (2014) Modules Improving Access to Health Care for People, p. 30"],
    "sourceTags": ["DREDF (2014)"],
    "needTags": ["staff", "time"]
  },
  // =================================================================
  // == Provider Training Needs
  // =================================================================
  {
    "id": "s9t1u2",
    "category": "Provider Training Needs",
    "recommendation": "Ensure all healthcare students (medical, allied health, etc.) receive disability training by embedding disability competencies in program learning objectives and integrating disability content into existing curricula.",
    "sources": ["Bowen et al (2020) A call to action_ Preparing a disability-com, p. 3", "NCD (2009) The Current State of Health Care for People with Dis, p. 97"],
    "sourceTags": ["Bowen et al (2020)", "NCD (2009)"],
    "needTags": ["education"]
  },
  {
    "id": "v3w4x5",
    "category": "Provider Training Needs",
    "recommendation": "Health and allied health professional associations should promote disability-competent care by providing disability continuing education training at professional meetings and through links to online continuing education resources.",
    "sources": ["Bowen et al (2020) A call to action_ Preparing a disability-com, p. 5"],
    "sourceTags": ["Bowen et al (2020)"],
    "needTags": ["education"]
  },
  {
    "id": "y6z7a8",
    "category": "Provider Training Needs",
    "recommendation": "Healthcare providers should develop or adapt their own disability-competent practices and training, potentially utilizing free resources like those on the Resources for Integrated Care (RIC) website.",
    "sources": ["Bowen et al (2020) A call to action_ Preparing a disability-com, p. 5"],
    "sourceTags": ["Bowen et al (2020)"],
    "needTags": ["time", "education"]
  },
  {
    "id": "b9c1d2",
    "category": "Provider Training Needs",
    "recommendation": "Provide ongoing staff training regarding individuals who use Other Power-Driven Mobility Devices (OPDMDs), including instruction on accommodated types, rules for obtaining credible assurance of use due to disability, and rules for device operation within the facility.",
    "sources": ["ADA (2014) ADA Requirements_ Wheelchairs, Mobility Aids"],
    "sourceTags": ["ADA (2014)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "e3f4g5",
    "category": "Provider Training Needs",
    "recommendation": "Train staff to understand that a person's ability to walk a short distance does not negate their potential need for a mobility device for longer distances or uneven terrain.",
    "sources": ["ADA (2014) ADA Requirements_ Wheelchairs, Mobility Aids"],
    "sourceTags": ["ADA (2014)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "h6i7j8",
    "category": "Provider Training Needs",
    "recommendation": "Train doctors and triage teams to ensure that medical analyses of whether an individual can respond to treatment are not influenced by the fact that the individual requires support for activities of daily living.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "k9l1m2",
    "category": "Provider Training Needs",
    "recommendation": "Train doctors and triage teams to refrain from employing assumptions and stereotypes about the worth or quality of life of a person with a disability when making medical treatment decisions.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1"],
    "sourceTags": ["HHS (2020)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "n3o4p5",
    "category": "Provider Training Needs",
    "recommendation": "Train doctors and triage teams to recognize and address potential conscious or unconscious biases in making critical healthcare decisions, acknowledging the history of discrimination experienced by people with disabilities in medical care.",
    "sources": ["(2020) Applying HHS’s Guidance for States and Health Care Provi, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 16"],
    "sourceTags": ["HHS (2020)", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "q6r7s8",
    "category": "Provider Training Needs",
    "recommendation": "Train healthcare providers and staff to develop skills and acquire tools for successfully providing accommodations to patients with disabilities.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 5"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "t9u1v2",
    "category": "Provider Training Needs",
    "recommendation": "Train providers to understand that not every healthcare visit for an individual with a disability is related to their disability and that these individuals require regular check-ups, screenings, and health education like all patients.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 12"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["education"]
  },
  {
    "id": "w3x4y5",
    "category": "Provider Training Needs",
    "recommendation": "Encourage and train providers to seek out the newest medical information regarding the relationship between relevant health conditions and a patient’s specific disability.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 12"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["time", "education"]
  },
  {
    "id": "z6a7b8",
    "category": "Provider Training Needs",
    "recommendation": "Train providers to understand the variability within disability categories, such as the fact that every person with a visual impairment has a different level of sight.",
    "sources": ["University of Delaware (2017) Effective Communication for Healt, p. 30"],
    "sourceTags": ["University of Delaware (2017)"],
    "needTags": ["education"]
  },
  {
    "id": "c9d1e2",
    "category": "Provider Training Needs",
    "recommendation": "Implement training programs for healthcare providers and administrators that encourage strategies for effectively understanding and meeting the needs of beneficiaries with disabilities.",
    "sources": ["CMS (2017) Increasing the Physical Accessibility of Health Care, p. 10", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 21", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 14"],
    "sourceTags": ["CMS (2017)", "CMS (2021)", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "f3g4h5",
    "category": "Provider Training Needs",
    "recommendation": "Train providers to raise their awareness of physical accessibility problems in healthcare settings and the potential solutions.",
    "sources": ["CMS (2017) Increasing the Physical Accessibility of Health Care, p. 11"],
    "sourceTags": ["CMS (2017)"],
    "needTags": ["education"]
  },
  {
    "id": "i6j7k8",
    "category": "Provider Training Needs",
    "recommendation": "When designing training for providers on the use of accessible equipment (e.g., accessible exam tables), consider their demanding schedules.",
    "sources": ["Maragh-Bass et al (2018) Healthcare provider perceptions of acc, p. 5"],
    "sourceTags": ["Maragh-Bass et al (2018)"],
    "needTags": ["time", "education"]
  },
  {
    "id": "l9m1n2",
    "category": "Provider Training Needs",
    "recommendation": "Provide formal education to healthcare providers that includes information on the prevalence and identification of disabilities (including invisible disabilities), effective communication strategies, and management of complex chronic illnesses in patients with disabilities.",
    "sources": ["McClintock et al (2018) Health care access and quality for pers, p. 5"],
    "sourceTags": ["McClintock et al (2018)"],
    "needTags": ["education"]
  },
  {
    "id": "o3p4q5",
    "category": "Provider Training Needs",
    "recommendation": "Utilize training methods such as short videos, documentaries, or in-person presentations featuring the stories and experiences of people with disabilities to address assumptions and share unique perspectives.",
    "sources": ["McClintock et al (2018) Health care access and quality for pers, p. 6", "Health First Colorado_10 Simple Steps for Disability Competent, p. 1"],
    "sourceTags": ["McClintock et al (2018)", "Health First Colorado"],
    "needTags": ["money", "time", "education"]
  },
  {
    "id": "r6s7t8",
    "category": "Provider Training Needs",
    "recommendation": "Incorporate education and training on the experiences and needs of people with disabilities into existing and new programs using both formal and informal approaches.",
    "sources": ["McClintock et al (2018) Health care access and quality for pers, p. 7"],
    "sourceTags": ["McClintock et al (2018)"],
    "needTags": ["time", "education"]
  },
  {
    "id": "u9v1w2",
    "category": "Provider Training Needs",
    "recommendation": "Train clinicians to be open-minded, supportive, and to gain experience working with people with various disabilities.",
    "sources": ["Mitra et al (2016) Pregnancy among women with physical disabili, p. 6"],
    "sourceTags": ["Mitra et al (2016)"],
    "needTags": ["education"]
  },
  {
    "id": "x3y4z5",
    "category": "Provider Training Needs",
    "recommendation": "Ensure all staff, including new staff, receive training on basic disability awareness, the Americans with Disabilities Act (ADA), policies and procedures for accommodating patients with disabilities, and methods for filing grievances.",
    "sources": ["DREDF (2010) Model Policies and Procedures for Primary Care Pra, p. 11", "CDC (2013) What Healthcare Professionals Can Do to be Accessibl, p. 1"],
    "sourceTags": ["DREDF (2010)", "CDC (2013)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "a6b7c8",
    "category": "Provider Training Needs",
    "recommendation": "Medical training institutions receiving federal funds should be required to include material in their curricula to ensure graduates possess disability knowledge, cultural competency, and a basic capacity to work effectively with people with disabilities.",
    "sources": ["NCD (2009) The Current State of Health Care for People with Dis, p. 97"],
    "sourceTags": ["NCD (2009)"],
    "needTags": ["education"]
  },
  {
    "id": "d9e1f2",
    "category": "Provider Training Needs",
    "recommendation": "Assess provider knowledge, confidence in treating patients with disabilities, and the disability training and cultural competency levels of office staff to inform training needs.",
    "sources": ["NCD (2009) The Current State of Health Care for People with Dis, p. 203 - 204"],
    "sourceTags": ["NCD (2009)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "g3h4i5",
    "category": "Provider Training Needs",
    "recommendation": "The Association of American Medical Colleges (AAMC) and the Liaison Committee on Medical Education (LCME) should identify specific disability competencies required for graduation and translate these into course recommendations for medical training programs.",
    "sources": ["NCD (2009) The Current State of Health Care for People with Dis, p. 240"],
    "sourceTags": ["NCD (2009)"],
    "needTags": ["education"]
  },
  {
    "id": "j6k7l8",
    "category": "Provider Training Needs",
    "recommendation": "Ensure training curricula include specific competencies such as providing developmentally appropriate healthcare transition services for young people with intellectual and developmental disabilities, awareness of language and cultural issues of the Deaf community, and general awareness of healthcare issues for people who are blind or have vision impairments, and women with disabilities.",
    "sources": ["NCD (2009) The Current State of Health Care for People with Dis, p. 240"],
    "sourceTags": ["NCD (2009)"],
    "needTags": ["education"]
  },
  {
    "id": "m9n1o2",
    "category": "Provider Training Needs",
    "recommendation": "Train providers on the importance of physical activity and healthy eating for patients with disabilities.",
    "sources": ["CDC (2013) What Healthcare Professionals Can Do to be Accessibl, p. 1"],
    "sourceTags": ["CDC (2013)"],
    "needTags": ["education"]
  },
  {
    "id": "p3q4r5",
    "category": "Provider Training Needs",
    "recommendation": "Train providers to be aware of, and advise patients and caregivers about, suitable exercise programs, nutrition/diet programs, and resources to identify these programs for people with disabilities.",
    "sources": ["CDC (2013) What Healthcare Professionals Can Do to be Accessibl, p. 1"],
    "sourceTags": ["CDC (2013)"],
    "needTags": ["time", "education"]
  },
  {
    "id": "s6t7u8",
    "category": "Provider Training Needs",
    "recommendation": "Train providers to recognize barriers to healthy weight for people with disabilities and to advise patients and caregivers on appropriate diet/healthy eating and physical activity options.",
    "sources": ["CDC (2013) What Healthcare Professionals Can Do to be Accessibl, p. 1"],
    "sourceTags": ["CDC (2013)"],
    "needTags": ["time", "education"]
  },
  {
    "id": "v9w1x2",
    "category": "Provider Training Needs",
    "recommendation": "Provide training to medical staff on proper patient handling techniques, including how to assist with transfers and positioning of individuals with disabilities, to be used in conjunction with accessible equipment.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 4", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 14", "DREDF (2014) Modules Improving Access to Health Care for People, p. 120", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 22"],
    "sourceTags": ["ADA (2010)", "DREDF (2014)", "CMS (2021)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "y3z4a5",
    "category": "Provider Training Needs",
    "recommendation": "Train staff on how to operate accessible medical equipment safely and effectively, including patient lift devices.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 4", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 14", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 16", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 19", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 21"],
    "sourceTags": ["ADA (2010)", "CMS (2021)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "b6c7d8",
    "category": "Provider Training Needs",
    "recommendation": "Train staff on non-discrimination principles related to individuals with disabilities.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 4"],
    "sourceTags": ["ADA (2010)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "e9f1g2",
    "category": "Provider Training Needs",
    "recommendation": "Utilize local or national disability organizations and ADA technical assistance materials for staff training.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 4"],
    "sourceTags": ["ADA (2010)"],
    "needTags": ["education"]
  },
  {
    "id": "h3i4j5",
    "category": "Provider Training Needs",
    "recommendation": "Provide adequate and ongoing training for all medical practitioners and staff, including immediate training on new accessible equipment (its proper use and maintenance), training for new staff upon hiring, and periodic refresher training annually.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 14", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 21", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 25"],
    "sourceTags": ["ADA (2010)", "CMS (2021)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "k6l7m8",
    "category": "Provider Training Needs",
    "recommendation": "Train staff to know which examination and procedure rooms are accessible and where portable accessible medical equipment and accessories (e.g., lifts, different-sized slings) are stored and available for use.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 14", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 17"],
    "sourceTags": ["ADA (2010)", "CMS (2021)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "n9o1p2",
    "category": "Provider Training Needs",
    "recommendation": "Train staff to ask patients with disabilities if they need assistance and, if so, the best way to help, understanding that needs vary.",
    "sources": ["ADA (2010) Access To Medical Care For Individuals With Mobility, p. 4", "ADA (2010) Access To Medical Care For Individuals With Mobility, p. 14", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 18"],
    "sourceTags": ["ADA (2010)", "CMS (2021)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "q3r4s5",
    "category": "Provider Training Needs",
    "recommendation": "Train staff on how to modify standard operating procedures to meet the specific accessibility needs of patients.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 17"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "t6u7v8",
    "category": "Provider Training Needs",
    "recommendation": "Train staff on how to collect information on disability and accessibility needs prior to a visit or at the point of care, how to document this information (e.g., in the EHR), and how to use it to best accommodate patient needs (e.g., booking accessible rooms, allocating additional appointment time).",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 17", "CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 22"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "w9x1y2",
    "category": "Provider Training Needs",
    "recommendation": "Train staff on standardized procedures for where and how to collect and access patient disability information within the practice's systems (manual, EHR, or hybrid).",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 22"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "z3a4b5",
    "category": "Provider Training Needs",
    "recommendation": "Train staff on what to do when a patient with a disability presents for an appointment and needs an accommodation that has not been planned for ahead of time.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 19"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "c6d7e8",
    "category": "Provider Training Needs",
    "recommendation": "Train practices on how to stratify collected patient data by disability status to identify and explore potential quality of care issues and target improvements.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 20"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "f9g1h2",
    "category": "Provider Training Needs",
    "recommendation": "Implement various training methods such as monthly 30-minute sessions, \"grand rounds\" style discussions of patient care/accessibility scenarios, and using staff with specialized training (e.g., physical therapists) to train coworkers on new equipment or techniques.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 21"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "i3j4k5",
    "category": "Provider Training Needs",
    "recommendation": "Ensure both staff and patients are aware of available accommodations and auxiliary aids.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 22"],
    "sourceTags": ["CMS (2021)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "l6m7n8",
    "category": "Provider Training Needs",
    "recommendation": "Train staff on appropriate accommodations for service animals, including how to ensure sufficient physical space and to always allow them.",
    "sources": ["CMS (2021) Modernizing Health Care to Improve Physical Accessib, p. 22", "Health First Colorado_Best Practices Disability Competent Physi, p. 1"],
    "sourceTags": ["CMS (2021)", "Health First Colorado"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "o9p1q2",
    "category": "Provider Training Needs",
    "recommendation": "Train staff in the use of respectful, accurate, person-first, and other strengths-based language.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Commu, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 10", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 4"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "r3s4t5",
    "category": "Provider Training Needs",
    "recommendation": "Ensure all office staff, including support staff, receive regular training to communicate with patients in a disability-competent manner, covering topics like etiquette and treating a wheelchair as personal space.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Commu, p. 1", "Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 10"],
    "sourceTags": ["Health First Colorado", "Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "u6v7w8",
    "category": "Provider Training Needs",
    "recommendation": "Identify someone in the organization who is disability competent to provide ongoing oversight and coaching to others.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Commu, p. 1"],
    "sourceTags": ["Health First Colorado"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "x9y1z2",
    "category": "Provider Training Needs",
    "recommendation": "Ensure there are sufficient, properly trained staff to provide timely, responsive primary care to patients with disabilities.",
    "sources": ["Health First Colorado_Best Practices Disability Competent Progr, p. 1"],
    "sourceTags": ["Health First Colorado"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "a3b4c5",
    "category": "Provider Training Needs",
    "recommendation": "Train relevant staff to utilize assistive technology when needed to effectively communicate with people who are deaf or hard-of-hearing.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 11"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "d6e7f8",
    "category": "Provider Training Needs",
    "recommendation": "Train appropriate staff in the use of telecommunications relay services when needed.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 12"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "g9h1i2",
    "category": "Provider Training Needs",
    "recommendation": "Train appropriate staff to schedule longer appointments when a patient is identified as needing additional time (e.g., for communication, transfers, positioning), particularly for individuals with intellectual, speech, or hearing disabilities.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 12"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "j3k4l5",
    "category": "Provider Training Needs",
    "recommendation": "Train Primary Care Practitioners (PCPs) to access and utilize a network of medical sub-specialists experienced in serving persons with disabilities.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 14"],
    "sourceTags": ["Colorado Dept HCPF (2019)"],
    "needTags": ["time", "education"]
  },
  {
    "id": "m6n7o8",
    "category": "Provider Training Needs",
    "recommendation": "Train staff to provide participant-centered care, recognizing the patient as the primary source for defining care goals and needs.",
    "sources": ["Colorado Dept HCPF (2019) Disability Competent Care Assessment, p. 16", "CMS (2022) How to Improve Physical Accessibility at Your Health, p. 4 (Ensure staff know patient is expert on own needs)"],
    "sourceTags": ["Colorado Dept HCPF (2019)", "CMS (2022)"],
    "needTags": ["staff", "education"]
  },
  {
    "id": "p9q1r2",
    "category": "Provider Training Needs",
    "recommendation": "Train staff on how to appropriately help a patient who may need assistance with dressing before and after an exam.",
    "sources": ["DREDF (2014) Modules Improving Access to Health Care for People, p. 120"],
    "sourceTags": ["DREDF (2014)"],
    "needTags": ["staff", "time", "education"]
  },
  {
    "id": "s3t4u5",
    "category": "Provider Training Needs",
    "recommendation": "Train staff to understand that covered entities cannot ask people about their disabilities (unless it pertains to credible assurance for OPDMD use).",
    "sources": ["ADA (2014) ADA Requirements_ Wheelchairs, Mobility Aids (General prohibition)", "ADA (2014) ADA Requirements_ Wheelchairs, Mobility Aids (Context of OPDMD credible assurance)"],
    "sourceTags": ["ADA (2014)"],
    "needTags": ["staff", "education"]
  }
]

async function uploadData() {
  console.log('Starting data upload...');
  const recommendationsCollection = collection(db, 'recommendations');
  
  for (const recommendation of FULL_RECOMMENDATIONS_LIST_FOR_SEEDING) {
    try {
      await addDoc(recommendationsCollection, recommendation);
      console.log(`Uploaded recommendation: ${recommendation.id}`);
    } catch (error) {
      console.error(`Error uploading recommendation ${recommendation.id}:`, error);
    }
  }
  
  console.log('Data upload completed!');
}

uploadData().catch(console.error); 