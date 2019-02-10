import React from 'react';
import {Pie} from 'react-chartjs-2';
import './aboutInfoStyle.css';

/*
Component for displaying information about color vision deficiencies to users
*/
const AboutInfo = ({toWhiteBackground, background}) => {

  //Data object for the pi graph
  const data ={
    labels: ["Males With A CVD", "Females With A CVD", "Males Without A CVD",
    "Females With A CVD"],
    datasets: [{
      label: 'Color Visions Deficiencies in a Population of 10,000 People',
      borderColor: 'black',
      backgroundColor: ['red', 'orange', 'blue', 'purple'],
      data:[416.67, 25, 4583.33, 4975],
      borderWidth: '2',
    }]
  }

  if (background !== 'white') {
    toWhiteBackground();
  }

  //Return statement for rendering the component
  return (
    <div className='aboutPage'>
      <p className='mainTitle'>
        Color Vision Deficiencies
      </p>
      <div>
        <Pie data={data} height={100}/>
      </div>
      <p className='center margin'>
        Color Vision Deficiencies (or CVDs) affects 1 in 12 men (8%) and 1 in
        200 Women across the world.
      </p>
      <p className='center margin'>
        The pie chart above shows this data in a population of 10,000 people.
      </p>
      <p className='center thirdTitle'>
        There are four main types of color vision deficiencies.
      </p>
      <div>
        <p className='center fourthTitle'>
          Protanomaly:
        </p>
        <p className='center margin'>
          There is a reduced sensitivity to red light. Most people with this
          have issues distinguishing between reds, greens, browns, and oranges.
          There can also be confusion when comparing blues and purples to one
          another. This is one of the most common forms of a CDV.
        </p>
      </div>
      <div>
        <p className='center fourthTitle'>
          Deuteranomaly:
        </p>
        <p className='center margin'>
          There is a reduced sensitivity to green light. Most people with this
          also have issues distinguishing between reds, greens, browns and
          oranges along with can confuse blues and purples when copmpared to one
          another. This is the other most common form of a CVD.
        </p>
      </div>
      <div>
        <p className='center fourthTitle'>
          Tritanomaly:
        </p>
        <p className='center margin'>
          There is a reduced sensitivity to blue right. Most people with this
          have issues distinguishing between blue and yellow, violet and red,
          and blue and green. Most of the colors someone with this would see
          are pink, red, black, white, grey, and turquoise. This CVD is
          extremely rare.
        </p>
      </div>
      <div>
        <p className='center fourthTitle'>
          Monochromacy:
        </p>
        <p className='center margin'>
          Individuals with this deficiency can see no colors at all. Everything
          is a shade of grey that ranges between white and black. This is
          incredibly rare (approximately 1 in 33,000 people are diagnosed With
          this condition). Due to the range of colors these individuals can
          see, it can make some tasks in life difficult to preform.
        </p>
      </div>
      <p className='center fourthTitle'>
        Each form of CVD has varying levels of severity.
      </p>
      <div>
        <p className='center fourthTitle'>
          What, in the eye, is causing colors to be percieved in this way?
        </p>
        <p className='center margin'>
          For individuals with Protanomaly, Deuteranomaly, and Tritanomaly,
          they are considered dichromatic, meaning that they only have two
          types of cones in their eyes to percieve colors. People without these
          deficiencies have three cones and each cone is responsible for
          percieving red, green, and blue. This is where the reduced sensitivity
          comes from, as the reduction in one cone causes a section of the color
          spectrum to not be viewable to the individual. This section happens
          to overlap for individuals with Protanomaly and Deuteranomaly, which
          is why some individuals may refer to their deficiency as 'red/green
          colorblindness', as these individuals may tend to see the world in
          very similar ways.
        </p>
      </div>
      <div>
        <p className='center fourthTitle'>
          Causes of Color Vision Deficiencies:
        </p>
        <p className='center margin'>
          Color Vision Deficiencies are normally caused by genetic conditions
          and are usually inheritied from an individual's parents. Men are more
          often impacted than women because the gene is carried in the X
          chromosome. There can be some other cases that cause color vision
          deficiencies however their causes are still being researched to
          determine the exact cause.
        </p>
      </div>
      <p className='center fourthTitle'>
        At this moment in time, there is no cure to these deficiencies.
      </p>
      <p className='center fourthTitle'>
        For more information, please visit the following websites:
      </p>
      <p className='center'>
        <a href='http://www.colourblindawareness.org/' className='padding'>
          colourblindawareness.org
        </a>
        <a
          href='https://www.aoa.org/patients-and-public/eye-and-vision-problems/glossary-of-eye-and-vision-conditions/color-deficiency'
          className='padding'
        >
          aoa.org
        </a>
        <a href='https://www.color-blindness.com/' className='padding'>
          color-blindness.com/
        </a>
      </p>
      <p className='center'>
        The information for this page was gathered from
        <a href='http://www.colourblindawareness.org/' className='padding'>
          colourblindawareness.org
        </a>
      </p>
    </div>
  );
}

export default AboutInfo;
