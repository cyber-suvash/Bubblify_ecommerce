
const Dropdown = ({item}) => {
  return (
    <>
    <ul>
        {
            item.map((each)=>(
                <li key={each.id}>{each.label}
                {each.children && <Dropdown item={each.children}/>}</li>
            ))
        }
    </ul>
    </>
  )
}

export default Dropdown