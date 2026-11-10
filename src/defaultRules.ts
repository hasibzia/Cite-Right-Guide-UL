import { ReferenceContextRule, UniversityBlueprint } from './types';

export const DEFAULT_CONTEXT_RULES: ReferenceContextRule[] = [
  {
    id: 'ul-journal-three-authors',
    category: 'Journal Article (3 Authors - UL Style)',
    sourceDescription: 'Journal article with 3 authors according to University of Limerick Harvard Cite It Right',
    exemplarInput: 'N. Shahrubudin, T. C. Lee and R. Ramlan, 2019, An overview on 3D printing technology: Technological, materials, and applications, Procedia Manufacturing volume 35 issue 35 pages 1286-1296, https://www.sciencedirect.com/science/article/pii/S2351978919308169, accessed 10 Nov 2026',
    exemplarOutput: 'Shahrubudin, N., Lee, T.C., and Ramlan, R. (2019) ‘An overview on 3D printing technology: Technological, materials, and applications’, <em>Procedia Manufacturing</em>, 35(35), 1286–1296, available: https://www.sciencedirect.com/science/article/pii/S2351978919308169 [accessed 10 Nov 2026].',
    exemplarInText: '(Shahrubudin, Lee, and Ramlan 2019)',
    notes: 'Journal name in italics and Times New Roman. Oxford comma before and. Volume(Issue) with no "vol." prefix, no "pp." prefix for pages. Available at: URL [accessed DD Mon YYYY].',
  },
  {
    id: 'ul-journal-multi-authors',
    category: 'Journal Article (Multiple Authors / Open Access DOI)',
    sourceDescription: 'Open-access biomedical paper with multiple co-authors and article ID',
    exemplarInput: 'Li, B., Zhang, M., Lu, Q., Zhang, B., Miao, Z., Li, L., Zheng, T., and Liu, P. (2022) Application and development of modern 3D printing technology in the field of orthopedics, BioMed Research International, vol 2022 issue NA, article e8759060, https://doi.org/10.1155/2022/8759060',
    exemplarOutput: 'Li, B., Zhang, M., Lu, Q., Zhang, B., Miao, Z., Li, L., Zheng, T., and Liu, P. (2022) ‘Application and development of modern 3D printing technology in the field of orthopedics’, <em>BioMed Research International</em>, 2022(NA), e8759060, available: https://doi.org/10.1155/2022/8759060.',
    exemplarInText: '(Li et al. 2022)',
    notes: 'Title in single curly quotes. Journal in italics. 2022(NA), e8759060, available: DOI.',
  },
  {
    id: 'ul-conference-series',
    category: 'Conference Paper / Series (2 Authors)',
    sourceDescription: 'Conference series publication with 2 authors and DOI link',
    exemplarInput: 'B. Ghosh and S. Karmakar (2024), 3D printing technology and future of construction: A review, IOP conference series. Earth and environmental science, volume 1326 issue 1, pages 012001-012001, doi:10.1088/1755-1315/1326/1/012001',
    exemplarOutput: 'Ghosh, B. and Karmakar, S. (2024) ‘3D printing technology and future of construction: A review’, <em>IOP conference series. Earth and environmental science</em>, 1326(1), 012001–012001, available: https://doi.org/10.1088/1755-1315/1326/1/012001.',
    exemplarInText: '(Ghosh and Karmakar 2024)',
    notes: 'Two authors joined with "and". Single quotes for paper title. Conference journal in italics. 1326(1), 012001–012001.',
  },
  {
    id: 'ul-book-single',
    category: 'Book (Single Author - UL Standard)',
    sourceDescription: 'Printed or electronic academic book with one author',
    exemplarInput: 'Charles Lipson, Cite Right: A Quick Guide to Citation Styles, University of Chicago Press, Chicago, 2011, 2nd edition.',
    exemplarOutput: 'Lipson, C. (2011) <em>Cite right: a quick guide to citation styles</em>, 2nd ed., Chicago: University of Chicago Press.',
    exemplarInText: '(Lipson 2011)',
    notes: 'Book title in italics. Edition abbreviated to 2nd ed., Place: Publisher.',
  },
  {
    id: 'ul-website',
    category: 'Website / Online Resource (UL Standard)',
    sourceDescription: 'Online webpage or organizational briefing with URL and access date',
    exemplarInput: 'World Health Organization (2023), Mental health in the workplace, published 14 Oct 2023, url: https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work, accessed 12 January 2024',
    exemplarOutput: 'World Health Organization (2023) <em>Mental health in the workplace</em>, available: https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work [accessed 12 Jan 2024].',
    exemplarInText: '(World Health Organization 2023)',
    notes: 'Webpage title in italics, followed by comma, available: URL [accessed DD Mon YYYY].',
  },
  {
    id: 'ul-chapter-edited',
    category: 'Chapter in Edited Book (UL Standard)',
    sourceDescription: 'Chapter authored by one writer inside an edited collection',
    exemplarInput: 'Tom Miller, Visual culture and the modern student, chapter in Contemporary Higher Education, edited by Helen Evans, Routledge, London, 2018, pages 45 to 62',
    exemplarOutput: 'Miller, T. (2018) ‘Visual culture and the modern student’, in Evans, H., ed., <em>Contemporary higher education</em>, London: Routledge, 45–62.',
    exemplarInText: '(Miller 2018)',
    notes: 'Chapter title in single quotes. Book title in italics. Page range without "pp." prefix.',
  },
];

export const DEFAULT_BLUEPRINT: UniversityBlueprint = {
  id: 'ul-harvard-cite-it-right',
  name: 'University of Limerick Harvard (Cite It Right / Glucksman Library)',
  standard: 'University of Limerick Cite It Right & MyBib Harvard Guide',
  institutionName: 'University of Limerick',
  generalInstructions: `1. Authors: List surnames followed by initials without spaces (e.g. Shahrubudin, N., Lee, T.C., and Ramlan, R.). For 3 or more authors, include an Oxford comma before ', and'.
2. Year: Enclosed in parentheses immediately following authors: (2019).
3. Article & Chapter Titles: Enclosed in single quotes ‘...’ in sentence case (only capitalize first word and proper nouns).
4. Source / Journal / Book Titles: Rendered in ITALICS (<em>...</em>) and classic serif typography (Times New Roman).
5. Volume, Issue & Pagination: Format strictly as 'Volume(Issue), pageRange' (e.g. '35(35), 1286–1296' or '2022(NA), e8759060'). DO NOT write 'vol.', 'no.', or 'pp.' for academic journals.
6. Web Links & Availability: Format strictly as ', available: [URL]' (lower-case 'available:').
7. Access Dates: When present, format in square brackets at the very end: ' [accessed Day Mon Year].' (e.g. ' [accessed 10 Nov 2026].'). If DOI without access date, end with a period '.'.
8. In-Text Citation: Format as (Author Year) or (Author, Author and Author Year) or (Author et al. Year) without comma between author and year in standard UL Harvard style.`,
  rules: DEFAULT_CONTEXT_RULES,
};

export const QUICK_INPUT_SAMPLES = [
  {
    label: '3D Printing Overview (Shahrubudin et al.)',
    category: 'Journal',
    text: 'N. Shahrubudin, T. C. Lee and R. Ramlan, 2019, An overview on 3D printing technology: Technological, materials, and applications, Procedia Manufacturing volume 35 issue 35 pages 1286-1296, https://www.sciencedirect.com/science/article/pii/S2351978919308169, accessed 10 Nov 2026',
  },
  {
    label: 'Orthopedics 3D Printing (Li et al.)',
    category: 'Journal',
    text: 'Li, B., Zhang, M., Lu, Q., Zhang, B., Miao, Z., Li, L., Zheng, T., and Liu, P. (2022) Application and development of modern 3D printing technology in the field of orthopedics, BioMed Research International, vol 2022 issue NA, article e8759060, https://doi.org/10.1155/2022/8759060',
  },
  {
    label: 'Construction 3D Printing (Ghosh & Karmakar)',
    category: 'Conference',
    text: 'B. Ghosh and S. Karmakar (2024), 3D printing technology and future of construction: A review, IOP conference series. Earth and environmental science, volume 1326 issue 1, pages 012001-012001, doi:10.1088/1755-1315/1326/1/012001',
  },
  {
    label: 'Academic Book (Lipson)',
    category: 'Book',
    text: 'Charles Lipson, Cite Right: A Quick Guide to Citation Styles, University of Chicago Press, Chicago, 2011, 2nd edition.',
  },
  {
    label: 'WHO Workplace Report',
    category: 'Website',
    text: 'World Health Organization (2023), Mental health in the workplace, published 14 Oct 2023, url: https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work, accessed 12 January 2024',
  },
];
