import React, { useEffect, useState } from 'react';
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = ({ setIsLoading, setSearchResults }) => {
  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [century, setCentury] = useState('any');
  const [classification, setClassification] = useState('any');

  useEffect(() => {
    Promise.all([
      fetchAllCenturies,
      fetchAllClassifications
    ]).then((res) => {
      const [allCenturies, allClassifications] = res;
      setCenturyList(allCenturies);
      setClassificationList(allClassifications);
    })
  }, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   * 
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   * 
   * then, in a try/catch/finally block:
   * 
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   * 
   * catch: error to console.error
   * 
   * finally: call setIsLoading, set it to false
   */
  return <form id="search" onSubmit={async (event) => {
    // write code here
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={/* this should be the query string */} 
        onChange={/* this should update the value of the query string */}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={/* this should be the classification */} 
        onChange={/* this should update the value of the classification */}>
        <option value="any">Any</option>
        {/* map over the classificationList, return an <option /> */}
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={/* this should be the century */} 
        onChange={/* this should update the value of the century */}>
        <option value="any">Any</option>
        {/* map over the centuryList, return an <option /> */}
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;
