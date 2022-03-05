/* eslint-disable react/prop-types */
import React, { Fragment } from "react";

import { fetchQueryResultsFromTermAndValue } from "../api";

const Searchable = (props) => {
  console.log(props)
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;

  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          try {
            const queryResults = await fetchQueryResultsFromTermAndValue({
              searchTerm,
              searchValue,
            });
            setSearchResults(queryResults);
          } catch {
            console.error("Something's wrong on searchable!");
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {props.searchValue}
      </a>
    </span>
  );
};

const Feature = (props) => {
  const { featuredResult } = props;

  if (!featuredResult) {
    return <main id="feature"></main>;
  } else {
    const {
      title,
      dated,
      images,
      primaryimageurl,
      description,
      culture,
      style,
      technique,
      medium,
      dimensions,
      people,
      department,
      division,
      contact,
      creditline,
    } = featuredResult;
    return (
      <main id="feature">
        <div className="object-feature">
          <header>
            <h3>{title}</h3>
            <h4>{dated}</h4>
          </header>
          <section className="facts">
            {description ? (
              <React.Fragment>
                <span className="title">Description</span>
                <span className="content">{description}</span>
              </React.Fragment>
            ) : null}
            {culture ? (
              <React.Fragment>
                <span className="title">Culture</span>
                <Searchable searchValue={culture} searchTerm={"culture"} {...props} />
              </React.Fragment>
            ) : null}
            {style ? (
              <React.Fragment>
                <span className="title">Style</span>
                <span className="content">{style}</span>
              </React.Fragment>
            ) : null}
            {technique ? (
              <React.Fragment>
                <span className="title">Technique</span>
                <Searchable searchValue={technique} searchTerm={"technique"} {...props}/>
              </React.Fragment>
            ) : null}
            {medium ? (
              <React.Fragment>
                <span className="title">Medium</span>
                <Searchable searchValue={medium} searchTerm={"medium"} {...props}/>
              </React.Fragment>
            ) : null}
            {dimensions ? (
              <React.Fragment>
                <span className="title">Dimensions</span>
                <span className="content">{dimensions}</span>
              </React.Fragment>
            ) : null}
            {people ? (
              <React.Fragment>
                <span className="title">People</span>
                {people.map((person)=> (<Searchable key={person.displayname} searchValue={person.displayname} searchTerm={"person"} {...props}/>))}
              </React.Fragment>
            ) : null}
            {department ? (
              <React.Fragment>
                <span className="title">Department</span>
                <span className="content">{department}</span>
              </React.Fragment>
            ) : null}
            {division ? (
              <React.Fragment>
                <span className="title">Division</span>
                <span className="content">{division}</span>
              </React.Fragment>
            ) : null}
            {contact ? (
              <React.Fragment>
                <span className="title">Contact</span>
                <span className="content">{contact}</span>
              </React.Fragment>
            ) : null}
            {creditline ? (
              <React.Fragment>
                <span className="title">Credit</span>
                <span className="content">{creditline}</span>
              </React.Fragment>
            ) : null}
          </section>
          {/* <section className="photos">
            {images.map((imgResult)=> (<img key={imgResult} src={imgResult.primaryimageurl}/>))}
          </section> */}
        </div>
      </main>
    );
  }
};

export default Feature;
