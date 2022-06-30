import React from 'react'
import {Button} from '@mui/material'
import { useState } from 'react'

export default function WorkspaceTable ({category}){
    const usersData = [
        { id: 1, name: category+'1'},
        { id: 2, name: category+'2'},
        { id: 3, name: category+'3'},
      ]
    
      const [users, setUsers] = useState(usersData)
    return(
  
  <table>
      <thead>
          <tr>
              <th>Name</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
      {usersData.length > 0 ? (
        usersData.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            
            <td>
                <Button variant="outlined" size="small">Edit</Button>
                <Button variant="outlined" size="small">Delete</Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
      
  </table>
  
  )
}
