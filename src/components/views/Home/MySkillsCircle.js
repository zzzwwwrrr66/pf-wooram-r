function MySkillsCircle(props) {
  return (
    <div className='items'>
      <hr style={{ border: "2px solid #ddd" }} />
      <div>
        <div style={{ width: "100%" }}>{props.children}</div>
        <div style={{ textAlign: 'center' }}>
          <h3 className="h5" style={{marginTop: '10px',fontSize: '16px'}}>{props.label}</h3>
          {/* <p>{props.description}</p> */}
        </div>
      </div>
    </div>
  );
}

export default MySkillsCircle;