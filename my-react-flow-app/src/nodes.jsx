const nodes = [
  {
    id: '1',
    data: { label: 'subtotal_job' },
    position: { x: -400, y: 0 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
  },
  {
    id: '1a',
    data: { label: 'Subtotal' },
    position: { x: 10, y: 50 },
    parentNode: '1',
  },
  {
    id: '2',
    data: { label: 'delievery_fee_job' },
    position: { x: -400, y: 500 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
  },
  {
    id: '2a',
    data: { label: 'DelieveryFee' },
    position: { x: 10, y: 50 },
    parentNode: '2',
  },
  {
    id: '2b',
    data: { label: 'ExtraSosDelievery' },
    position: { x: 10, y: 50 },
    parentNode: '2',
  },

  {
    id: '3',
    data: { label: 'service_fee_job' },
    position: { x: -400, y: 250 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
  },
  {
    id: '3a',
    data: { label: 'ServiceRate' },
    position: { x: 10, y: 50 },
    parentNode: '3',
  },


  {
    id: '4',
    data: { label: 'service_fee_collector_job' },
    position: { x: 100, y: 250 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
  },
  {
    id: '4a',
    data: { label: 'ServiceFee' },
    position: { x: 10, y: 50 },
    parentNode: '4',
  },



  {
    id: '5',
    data: { label: 'total_before_credits_applied_collector_job' },
    position: { x: 500, y: 250 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
  },
  {
    id: '5a',
    data: { label: 'FinalServiceFee' },
    position: { x: 10, y: 50 },
    parentNode: '5',
  },

  {
    id: '5b',
    data: { label: 'FinalDelieveryFee' },
    position: { x: 10, y: 50 },
    parentNode: '5',
  },

  {
    id: '5c',
    data: { label: 'TotalBeforeCreditsApplied' },
    position: { x: 10, y: 50 },
    parentNode: '5',
  },
  
];

export default nodes;
