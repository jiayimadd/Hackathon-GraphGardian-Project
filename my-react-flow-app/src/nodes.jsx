// for parent nodes, height should be 50 + 50*number of children --> 50*(number of children + 1)
const nodes = [
  {
    id: '1',
    data: { label: 'subtotal_job' },
    position: { x: -400, y: 0 },
    className: 'light',
    style: { backgroundColor: 'rgba(110,194,225, 0.3)', width: 260, height: 100 },
  },
  {
    id: '1a',
    data: { label: 'Subtotal' },
    position: { x: 45, y: 50 },
    parentNode: '1',
    style: { backgroundColor: 'rgba(255,255,255, 0.9)', width: 165, height: 35 },
  },

  {
    id: '2',
    data: { label: 'delievery_fee_job' },
    position: { x: -400, y: 500 },
    className: 'light',
    style: { backgroundColor: 'rgba(110,194,225, 0.3)', width: 260, height: 150 },
  },
  {
    id: '2a',
    data: { label: 'DelieveryFee' },
    position: { x: 45, y: 50 },
    parentNode: '2',
    style: { backgroundColor: 'rgba(255,255,255, 0.9)', width: 165, height: 35 },
  },
  {
    id: '2b',
    data: { label: 'ExtraSosDelievery' },
    position: { x: 45, y: 100 },
    parentNode: '2',
    style: { backgroundColor: 'rgba(255,255,255, 0.9)', width: 165, height: 35 },
  },

  {
    id: '3',
    data: { label: 'service_fee_job' },
    position: { x: -400, y: 250 },
    className: 'light',
    style: { backgroundColor: 'rgba(110,194,225, 0.3)', width: 260, height: 100 },
  },
  {
    id: '3a',
    data: { label: 'ServiceRate' },
    position: { x: 45, y: 50 },
    parentNode: '3',
    style: { backgroundColor: 'rgba(255,255,255, 0.9)', width: 165, height: 35 },
  },


  {
    id: '4',
    data: { label: 'service_fee_collector_job' },
    position: { x: 100, y: 250 },
    className: 'light',
    style: { backgroundColor: 'rgba(110,194,225, 0.3)', width: 260, height: 100 },
  },
  {
    id: '4a',
    data: { label: 'ServiceFee' },
    position: { x: 45, y: 50 },
    parentNode: '4',
    style: { backgroundColor: 'rgba(255,255,255, 0.9)', width: 165, height: 35 },
  },



  {
    id: '5',
    data: { label: 'total_before_credits_applied_collector_job' },
    position: { x: 500, y: 250 },
    className: 'light',
    style: { backgroundColor: 'rgba(110,194,225, 0.3)', width: 260, height: 200 },
  },
  {
    id: '5a',
    data: { label: 'FinalServiceFee' },
    position: { x: 45, y: 50 },
    parentNode: '5',
    style: { backgroundColor: 'rgba(255,255,255, 0.9)', width: 165, height: 35 },
  },

  {
    id: '5b',
    data: { label: 'FinalDelieveryFee' },
    position: { x: 45, y: 100 },
    parentNode: '5',
    style: { backgroundColor: 'rgba(255,255,255, 0.9)', width: 165, height: 35 },
  },

  {
    id: '5c',
    data: { label: 'TotalBeforeCreditsApplied' },
    position: { x: 45, y: 150 },
    parentNode: '5',
    style: { backgroundColor: 'rgba(255,255,255, 0.9)', width: 165, height: 35 },
  },

];

export default nodes;
