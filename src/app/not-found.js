import Image from 'next/image'

import "@/components/css/errors.css";

import { PageLoad } from "@/components/page_part/user_side/common/Load";

import logo_404 from "@/../public/img/home/errors/logo_404.png";

export default function NotFound() {
  return (
    <div class="not-found">
      <PageLoad/>
      <div class="container">
        <div class="row-2">
            <div class="col">
                <Image
                    src={logo_404}
                    className={"logo-404"}
                    width={960}
                    height={465}
                    alt="404"
                />
            </div>
        </div>
      </div>
    </div>
  )
}

