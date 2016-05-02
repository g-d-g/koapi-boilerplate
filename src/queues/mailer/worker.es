export default function (job) {
  return new Promise((resolve, reject)=>{
    console.log(job.data);
    resolve();
  });
};
