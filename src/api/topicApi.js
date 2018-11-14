import api from 'api/apiService';

class TopicApi {
  static getTopics() {
    return api.get('topics');
  }
}

export default TopicApi;
