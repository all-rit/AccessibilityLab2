import React from 'react';
import {Link} from 'react-router-dom';

const SuppMaterials = () => {
  return (
    <div>
      <h1>Supplementary Materials</h1>
      <p>
        Slide show is available to view via google slides
        <a
          href='https://docs.google.com/presentation/d/1jsPoCObj6a4n9jdxsXQxW3KVHYLJB7rAU2eauUQ4ZCM/edit?usp=sharing'
          style={{marginLeft: '4px'}}
        >
          here
        </a>
      </p>
      <div style={{display: 'flex', justifyContent: 'start'}}>
        <p>
          Video is currently unavailable.
        </p>
        <p style={{marginLeft: '4px'}}>
          Check back later to watch an interview with individuals who have color vision deficiencies!
        </p>
      </div>
      <p>
        Case study is available
        <span style={{marginLeft: '4px'}}>
          <Link to='/caseStudy'>
            here
          </Link>
        </span>
      </p>
    </div>
  );
}

export default SuppMaterials;
