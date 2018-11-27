import api from 'api/apiService';

class TargetApi {
  static getTargets() {
    return api.get('targets');
  }

  static createTarget(target) {
    return api.post('targets', target);
  }

  static deleteTarget(targetId) {
    return api.delete(`targets/${targetId}`);
  }
}

export default TargetApi;
