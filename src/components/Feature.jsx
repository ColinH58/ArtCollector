/* eslint-disable react/prop-types */
import React, { Fragment } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

/**
 * We need a new component called Searchable which:
 *
 * Has a template like this:
 *
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 *
 * When someone clicks the anchor tag, you should:
 *
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 *
 * Then start a try/catch/finally block:
 *
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch:
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = ({ searchTerm, searchValue, setIsLoading, setSearchResults }) => {
    return (
        <span className="content">
            <a href="#" onClick={async (event) => {
                event.preventDefault()
                setIsLoading(true)
                try {
                    const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue)
                    setSearchResults(results)
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            }}>{ searchTerm }</a>
        </span>
    );
};

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */
const Feature = (props) => {
    const {featuredResult} = props

    //people.map(() => {})
    if (!featuredResult) {
        return (
            <main id="feature"></main>
        )
    } else {
        const { title, dated, images, primaryimageurl, description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline } = props
        return (
             <main id="feature">
               <div className="object-feature">
                 <header>
                   <h3>{title}</h3>
                   <h4>{dated}</h4>
                 </header>
                 <section className="facts">
                     { culture ? 
                     <React.Fragment>
                        <span className="title">Culture</span>
                        <Searchable searchValue={culture} searchTerm={"culture"}/>
                     </React.Fragment> : null
                     }
                    { style ? 
                     <React.Fragment>
                        <span className="title">Style</span>
                        <span className="content">{style}</span>
                     </React.Fragment> : null
                     }
                     { technique ?
                     <React.Fragment>
                         <span className="title">Technique</span>
                         <Searchable searchValue={technique} searchTerm={"technique"}/>
                     </React.Fragment> : null
                     }
                      { medium ? 
                     <React.Fragment>
                        <span className="title">Medium</span>
                        <Searchable searchValue={medium.toLowerCase()} searchTerm={"medium"}/>
                     </React.Fragment> : null
                     }
                      { dimensions ? 
                     <React.Fragment>
                        <span className="title">{dimensions}</span>
                        <span className="content">{dimensions}</span>
                     </React.Fragment> : null
                     }
                      { people ? 
                     <React.Fragment>
                        <span className="title">{people}</span>
                        {people.map((person)=> (<Searchable key={person.displayname} src={person.displayname}/>))}
                     </React.Fragment> : null
                     }
                 </section>
                 <section className="photos">
                   {images.map((img) => (<img key={img.primaryimageurl} src={img.primaryimageurl}/>))}
                 </section>
               </div>
             </main>
        )
    }
};

export default Feature;
