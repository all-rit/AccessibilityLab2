import React from 'react';
import {Link} from 'react-router-dom';
import './suppMaterials.css';

const CaseStudy = () => {
  return (
    <div>
      <p className='suppTitle'>Case study On Color Contrast</p>
      <div className='group'>
        <div>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/300px-64_365_Color_Macro_%285498808099%29.jpg'
            alt='Colored Pencils Aligned in a circle'
            className='colorImage'
          >
          </img>
          <p className='caseStudyText'>Figure 1</p>
          <p className='caseStudyText'>
            Colored pencils showing off color differences.
          </p>
        </div>
        <p className='caseStudy extraMarginThree'>
          In order to establish accessibility standards throughout government-run technology applications, allowing for anyone with or without a disability to interact with fundamental government websites, kiosks, and mobile applications,
          <a
            href='https://www.section508.gov'
            className='linkTag'
          >
            Section 508 of the Rehabilitation Act
          </a>
          was established in 1998. This Section outlines all of the necessary components of web infrastructure to keep its promise to ensure applications are accessible to all.
          <a
            href='https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/iii-major-issues'
            className='linkTag'
          >
            Section 508.C
          </a>
          is fundamental to this project, as it outlines the necessity for applications to not use color just to portray important information, and it ensures color contrast levels meet the
          <a
            href='https://www.w3.org/WAI/standards-guidelines/wcag/#versions'
            className='linkTag'
          >
            WCAG AAA standards
          </a>
          . This relates directly to this web application, as its main focus is to outline and teach the necessity of proper color contrast in order to ensure individuals with a color vision deficiency can properly identify prominent information in student’s web applications moving forward.
        </p>
      </div>
      <div className='group'>
        <p className='caseStudy extraMarginOne'>
          Existing validators, such as
          WebAIM’s Color Contrast Calculator
          help to ensure this standard is met. Color contrast calculators work by a user inputting a background color as well as the color of the text they are hoping to use for their application. An algorithm is used to determine how, when justified on top of one another, what ratio of difference there is between the two colors. This ratio is then used to determine if the color contrast is high enough for an individual with a color vision deficiency to be able to discern between the two colors. If the ratio is too low, an individual with a color vision deficiency could potentially either miss altogether or have a very difficult time seeing text that could be vital to their use of the application. An example of this would be a user agreement hidden behind too low of contrasting colors, like in the AirBnB example above (Figure 2). An individual with a color vision deficiency could miss the agreement and then could violate the company’s guidelines. In court, the individual with the deficiency could sue the company for damages, as they were unable to see the rules and regulations in the first place. With proper color contrast, this issue can be avoided, and the individual would be able to see the agreement, ensuring that the individual could not sue for damages. The proper WCAG AAA standard places proper color contrast at a rating of seven to one for font sizing twelve pixels to eighteen pixels, and four point five to one for font sizing eighteen pixels or above.
        </p>
        <div>
          <img src={require("./airbnb.png")} alt='AirBnB Example' className='img'>
          </img>
          <p className='caseStudyText'>Figure 2</p>
          <p className='caseStudyText'>
            A potential landing page for the popular housing app, AirBnB, showing
            off the dangers of poor color contrast
          </p>
        </div>
      </div>
      <div className='group'>
        <div>
          <img
            src='https://i.pinimg.com/originals/d4/1e/a3/d41ea3ec3160ed3b0f994fafa91d8125.png'
            alt='Good and bad color contrast'
          >
          </img>
          <p className='caseStudyText'>Figure 3</p>
          <p className='caseStudyText'>
            Different color contrasts on different backgrounds. Shows good and
            bad options for each square.
          </p>
        </div>
        <p className='caseStudy extraMarginTwo'>
          The importance of color contrast rings true throughout the internet, as multiple publications each year host lists featuring the
          worst website designs
          . Most of these designs bost horrendous color contrasts that even a person without a color vision deficiency has issues seeing the webpage. Each and every year, however, it seems that
          Yale’s School of Art
          has one of the largest issues with color contrast. Year after year individuals online complain about clashing background and foreground elements. When a background picture is updated on the site, there is little to no thought that goes into changing the foreground elements to ensure the colors don’t contrast one another too heavily. So far, there has not been a lawsuit over the issue, but it continues to be one of the top listed items on forums for the worst web design with the main complaint being color contrast.
        </p>
      </div>
      <div className='group'>
        <p className='caseStudy extraMarginOne'>
          As software developers, we have a professional responsibility to uphold the
          <a
            href='https://www.acm.org/code-of-ethics'
            className='linkTag'
          >
            Association for Computing Machinery (ACM) code of ethics
          </a>
          ,
          <a
            href='https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities.html'
            className='linkTag'
          >
            the Convention on the Rights of Persons with Disabilities (CRPD)
          </a>
          , and our own personal morals. We as individuals must ensure that we contribute to society and to human well-being, acknowledging that all people are stakeholders in computing
          <a
            href='https://www.acm.org/code-of-ethics#h-1.1-contribute-to-society-and-to-human-well-being,-acknowledging-that-all-people-are-stakeholders-in-computing.'
            className='linkTag'
          >
            (ACM 1.1)
          </a>
          and that we are fair and take action not to discriminate
          <a
            href='https://www.acm.org/code-of-ethics#h-1.4-be-fair-and-take-action-not-to-discriminate.'
            className='linkTag'
          >
            (ACM 1.4)
          </a>
          . On top of this, we must take into account the protection and promotion of the human rights of persons with disabilities in all policies and programmes, including our web development
          <a
            href='https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities/article-4-general-obligations.html'
            className='linkTag'
          >
            (CRPD Article 4.C)
          </a>
          . In order to ensure we are compliant with all of these professional responsibilities, as well as ensure we as individuals are upholding our own morals, color contrast must be considered in everything we create for the web, as without it, we are not treating individuals with a color vision deficiency as a stakeholder in computing, we are discriminating against their use of our applications, and we are not protecting the rights of these individuals to be able to access the internet the same as everyone else. Color contrast and
          <a
            href='https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/iii-major-issues'
            className='linkTag'
          >
            Section 508.C
          </a>
          is vital to the continued success of web applications on the internet.
        </p>
        <div>
          <img
            src='http://design.samsung.com/global/m/contents/accessibility_design/img/main_title.gif'
            alt='accessibility for all banner'
            className='accessibilityImage'
          >
          </img>
          <p className='caseStudyText'>Figure 4</p>
          <p className='caseStudyText'>
            A call to action to ensure all applications are accessible to everyone
          </p>
        </div>
      </div>
      <Link
        to='/suppMaterials'
        style={{display:'flex', justifyContent: 'center', fontSize:'26px', marginBottom: '30px'}}
      >
        Go Back to Supplementary Materials
      </Link>
    </div>
  );
}

export default CaseStudy;
