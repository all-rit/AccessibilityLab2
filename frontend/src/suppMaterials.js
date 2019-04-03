import React from 'react';
import {Link} from 'react-router-dom';
import './suppMaterials.css';

const SuppMaterials = () => {
  return (
    <div>
      <h1 className='suppTitle'>Supplementary Materials</h1>
      <div className='elements'>
        <p className='suppP'>
          &#10142; Slide show is available to view via google slides
          <a
            href='https://docs.google.com/presentation/d/1jsPoCObj6a4n9jdxsXQxW3KVHYLJB7rAU2eauUQ4ZCM/edit?usp=sharing'
	    target='_blank'
            style={{marginLeft: '4px'}}
          >
            here
          </a>
        </p>
        <div style={{display: 'flex', justifyContent: 'start'}}>
          <p className='suppP'>
            &#10142; Video available <a href='https://www.youtube.com/watch?v=d6KKsmmOKEI&t=232s'>here</a>
          </p>
        </div>
        <p className='suppP'>
          &#10142; Case study is available
          <span style={{marginLeft: '4px'}}>
            <Link to='/caseStudy'>
              here
            </Link>
          </span>
        </p>
        <p className='suppP' style={{paddingTop: '20px'}}>
          &#10142; You can also go back to the main application
          <span style={{marginLeft: '4px'}}>
            <Link to='/'>
              here
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SuppMaterials;
