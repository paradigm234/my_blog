/**
 * 后端地址。
 *
 * 线上用自有子域而不是 xxx.vercel.app：vercel.app 在国内被 DNS 污染，
 * 直接用默认域名的话读者（包括你自己）根本连不上。
 *
 * 本地联调时临时改成 "http://localhost:8080"（后端 `go run .` 的默认端口）。
 */
export const API_BASE = "https://api.junhaowang.cn";
