const Filter = ({filterName, filterByName}) =>  {
    return (
        <div>
         filter shown with <input value={filterName} onChange={filterByName}/>
      </div>
    )
};

export default Filter;