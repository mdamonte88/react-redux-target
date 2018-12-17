import api from 'api/apiService';

class TargetApi {
  static getTargets() {
    return api.get('targets');
  }

  static createTarget(target) {
    return api.post('targets', target);
  }

  static deleteTarget(target) {
    return api.delete(`targets/${target.id}`, target);
  }
}

export default TargetApi;
