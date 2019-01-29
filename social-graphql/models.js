import _ from 'lodash';
import axios from 'axios';

class UserModel {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000', // json-server endpoint
    });
  }

  list() {
    return this.api.get('/users').then(res => res.data);
  }

  find(id) {
    return this.api.get(`/users/${id}`).then(res => res.data);
  }

  create(data) {
    const friends = _.map(data.friends, id => ({ id }));

    return this.api.post('/users', { ...data, friends }).then(res => res.data);
  }

  delete(id) {
    return this.api.delete(`/users/${id}`).then(() => id);
  }

  update(data) {
    console.log('data.friends', data.friends);
    if (data.friends) {
      console.log('path 1');
      const friends = _.map(data.friends, id => ({ id }));
      return this.api.patch(`/users/${data.id}`, { ...data, friends }).then(res => res.data);
    }
    console.log('path 2');
    return this.api.patch(`/users/${data.id}`, { ...data }).then(res => res.data);
  }
}


export default new UserModel();
