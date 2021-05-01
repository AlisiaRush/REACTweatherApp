import React from 'react';

class App extends React.Component {

    /**
     * constructor
     *
     * @object  @props  parent props
     * @object  @state  component state
     */
    constructor(props) {

        super(props);

        this.state = {
            items: [],
            isLoaded: false
        }

    }

    componentDidMount() {

        fetch('https://api.weather.gov/points/33.9462,-84.3346')
      
            .then(res => res.json())
            .then(json => {
              console.log(`JSON Result: `, json);
              this.setState({
                  items: json,
                  isLoaded: true, 
              })
            })
            .catch((err) => {
                console.log(err);
            });

    }

    // getCounties(){
    //   fetch('https://api.weather.gov/zones/county/GAC089')
      
    //         .then(res => res.json())
    //         .then(json => {
    //           console.log(`JSON Result for County: `, json);
    //           this.setState({
    //               items: json,
    //               isLoaded: true, 
    //           })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });  
    // }
    
    render() {

        const { isLoaded, items } = this.state;

        if (!isLoaded)
            return <div>Loading...</div>;

        return (
            <div className="App">
              
                X COORDINATES:<span style={{color: "blue"}}>{items.geometry.coordinates[0]}</span> <br/>
                Y COORDINATES: <span style={{color: "blue"}}> {items.geometry.coordinates[1]}</span> 
            
              <div>

                City: {items.properties.relativeLocation.properties.city}<br/>
                State: {items.properties.relativeLocation.properties.state}<br/>
                County: {items.properties.name}

              </div>
            </div>
        );

    }

}

export default App;