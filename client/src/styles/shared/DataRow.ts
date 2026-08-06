import styled from 'styled-components'
import 'bootstrap-icons/font/bootstrap-icons.css'

const DataRow = styled.div`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  line-height: 20px;

  hr {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  &#where-at-yale {
    margin-bottom: 0.25rem;
  }

  &#group-activity {
    margin-bottom: 0rem;
  }

  .identifiers-header-custom {
    padding-top: 0;
    margin-top: -1rem;
  }

  .noteContent div::before {
    font-family: 'bootstrap-icons';
    content: '\\f341';
    margin-right: 0.25rem;
    font-size: 1rem;
    
  }

  .concepts-list dd a::before {
    font-family: 'bootstrap-icons';
    content: '\\f46b';
    margin-right: 0.25rem;
    font-size: 0.75rem;
  }

  #plan-your-visit-link p span a {
    font-family: 'Mallory Medium', sans-serif;
    font-weight: 700;
    text-decoration: none;
  }

  #plan-your-visit-link p span a:hover {
    text-decoration: underline;
  }
`

export default DataRow
