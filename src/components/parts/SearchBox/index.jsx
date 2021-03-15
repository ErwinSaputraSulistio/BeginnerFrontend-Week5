import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'

export default class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [
                {
                  key: 'john',
                  value: 'John Doe',
                },
                {
                  key: 'jane',
                  value: 'Jane Doe',
                },
                {
                  key: 'mary',
                  value: 'Mary Phillips',
                },
                {
                  key: 'robert',
                  value: 'Robert',
                },
                {
                  key: 'karius',
                  value: 'Karius',
                },
              ]
        }
     }

  render() {
    return (
      <ReactSearchBox
        placeholder="Search for John, Jane or Mary"
        data={this.state.data}
        onSelect={record => console.log(record)}
        onFocus={() => {
          console.log('This function is called when is focussed')
        }}
        onChange={value => console.log(value)}
        fuseConfigs={{
          threshold: 0.05,
        }}
        value="John"
      />
    )
  }
}