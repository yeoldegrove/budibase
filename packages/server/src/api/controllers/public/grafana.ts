const GrafanaResources = {}

export async function search(ctx: any, next: any) {
  ctx.body = ["tables", "applications", "users", ""]
  await next()
}

export async function query(ctx: any, next: any) {
  ctx.body = [
    {
      target: "pps in",
      datapoints: [
        [622, 1450754160000],
        [365, 1450754220000],
      ],
    },
    {
      target: "pps out",
      datapoints: [
        [861, 1450754160000],
        [767, 1450754220000],
      ],
    },
    {
      target: "errors out",
      datapoints: [
        [861, 1450754160000],
        [767, 1450754220000],
      ],
    },
    {
      target: "errors in",
      datapoints: [
        [861, 1450754160000],
        [767, 1450754220000],
      ],
    },
  ]
  await next()
}

export async function check(ctx: any, next: any) {
  ctx.body = { status: "ok" }
  await next()
}

export default {
  search,
  query,
  check,
}
