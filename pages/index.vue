<script lang="ts" setup>
const text: Ref<any> = ref("");

const uploadFile = (e: any) => {
  const file = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = (el) => {
    text.value = fileReader.result;
  };
};

const send = async () => {
  const { data: res } = await useFetch("/api/upload-hands", {
    method: "POST",
    body: {
      contents: text.value,
    },
  });
};

const recentMatchData: Ref<matchInfo[]> = ref([]);
async function getRecentMatchData() {
  const { data } = await useFetch("/api/sql/match");
  recentMatchData.value = JSON.parse(data.value);
}

const findBoardSetByMatchId: Ref<boardRecord[]> = ref([]);
async function getBoardData(uuid) {
  const { data } = await useFetch("/api/sql/get-board-data", {
    method: "POST",
    body: {
      uuid: uuid,
    },
  });
  findBoardSetByMatchId.value = JSON.parse(data.value);
}

function click(val) {
  console.log(val);
}

const tst = computed(() => {
  return t
    .match(/(?<=pn\|)(.+?)(?=\|pg)/g)?.[0]
    .split(",")
    .slice(0, 4)
    .toString();
});

const t = `
vg|ROMANIAN SUPERLEAGUE FINAL,ROUND 3_3,I,17,32,BC BRASOV,15,LOCO CFR1_,37|
rs|3NW+2,5CEx-1,2HW=,1NW+1,4HE+1,4HE+1,4SE=,3SE+1,3NS-2,3NS=,4SN=,5HWx-4,4HE=,4HEx=,6CS=,5CN+1,3NE+2,3NW+2,1NW+2,4CW-1,4HE-2,4CW=,3NW+1,3NW+2,6DE-1,3NE+2,2HW=,2SE=,1NW+1,1NW+1,4HN=,4HS=|
pn|MORARU M.,MIHAI R. ,MOLDOVAN ,MIHAI G.,Chelu,Moraru,Micescu,Teodorescu|pg||
qx|o17|st||md|3SA9543HQ93DQ743CT,SQJ2H8DAKT852CJ86,SK87HAJ76DJ9C9742,ST6HKT542D6CAKQ53|sv|o|mb|p|mb|1H|mb|1S!|mb|d|mb|2S|mb|3C|mb|p|mb|3D|nt|vugraphzjv: http://www.frbridge.ro/rezultate/2022_2023/CN_2022_2023/CN_Echipe/SuperLiga/2023-05-06-07.htm|pg||
nt|vugraphzjv: results updated after first 16 boards of the final round|pg||
mb|p|mb|3H|mb|p|mb|3N|mb|p|mb|p|mb|p|pc|s7|pc|sT|pc|sA|pc|s2|pg||
nt|vugraphzjv: so LOCO in the pole position |pg||
pc|s5|pc|sQ|pc|sK|pc|s6|pg||
pc|s8|pc|h2|pc|s4|pc|sJ|pg||
nt|vugraphzjv: ducking first @s was the winning line in defence|pg||
nt|vugraphzjv: hard to know what holding has partner|pg||
pc|h8|pc|h6|pc|hK|pc|h3|pg||
pc|c3|pc|cT|pc|cJ|pc|c4|pg||
pc|c8|pc|c2|pc|cQ|nt|vugraphzjv: now @h K was the 9th trick|pg||
pc|d4|pg||
pc|cA|pc|d3|pc|c6|pc|c7|pg||
pc|cK|pc|d7|pc|d2|pc|c9|pg||
pc|c5|pc|s3|pc|d5|pc|d9|pg||
pc|d6|pc|dQ|mc|11|pg||
qx|c17|st||md|3SA9543HQ93DQ743CT,SQJ2H8DAKT852CJ86
`;
</script>

<template lang="pug">
.top
  input(type="file" @change="uploadFile")
  br
  div(v-for="data in recentMatchData")
    button(@click="getBoardData(data.uuid)")
      | {{ data.name }}

  button(@click="send")
    | test
  button(@click="getRecentMatchData")
    | get
  atom-common-input(input-size="m" @clickSearch="click")
  p {{ tst }}
</template>
