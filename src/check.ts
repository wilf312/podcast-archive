import JSON5 from "https://deno.land/x/json5/mod.ts";
import { parse } from "https://deno.land/x/xml/mod.ts";



const main = async () => {
  const text = Deno.readTextFile("./assets/rss.json5");
  const rss = await text.then((response) => {
    // TODO: [0].url を削除してリストを返す
    return JSON5.parse(response).url[0].url
  });

  console.log(rss)
  
  const res = await fetch(rss)

  // console.log(res)
  const _xml = await res.text()

  const data: any = parse(_xml)

  // TODO: splice削除
  const episodeList = data.rss.channel.item.splice(0, 1)

  episodeList.forEach((d: any) => {
    console.log(d)
    const url = d.enclosure['@url']
    console.log(url)

    fetch(url).then(res => res.blob())
      .then((podcast: any) =>  Deno.writeTextFile("./hello.txt", podcast))
  })

  
}
main()