<template>
    <div class="memo">
        <div class="act">
            <button class="btn btn-primary" @click="add()">+ 추가</button>
        </div>
        <ul>
            <li v-for="(d, idx) in state.data" :key="idx" @click="edit(idx)">
                {{ d }}
                <i class="bi bi-x-lg" @click.stop="del(idx)"></i>
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const state = reactive({
            data: []
        })
        const add = () => {
            const content = prompt('내용을 입력해주세요.');
            if (content === null || content.trim() === "") return;
            axios.post("/api/memos", { content }).then((res) => {
                state.data = res.data;
            })
        };

        const edit = (idx) => {
            const content = prompt("내용을 수정해주세요.", state.data[idx]);
            if (content === null || content.trim() === "") return; // ✅ 취소 누르면 아무것도 안함
            axios.put("/api/memos/" + idx, { content }).then((res) => {
                state.data = res.data;
            })
        }

        const del = (idx) => {
            const ok = confirm("정말 삭제하시겠습니까?");
            if (!ok) return;
            axios.delete("/api/memos/" + idx).then((res) => {
                state.data = res.data;
            })
        }

        axios.get("/api/memos").then((res) => {
            state.data = res.data;
        })

        return { state, add, edit, del };
    },
};
</script>

<style lang="scss" scoped>
.memo {
    .act {
        text-align: right;
        padding: 10px 10px 5px 5px;
    }

    ul {
        list-style: none;
        padding: 15px 0;
        margin: 0;
        border-top: 1px solid #eee;

        li {
            display: flex; // ✅ flex 사용
            justify-content: space-between; // ✅ 좌우로 정렬
            padding: 10px 15px;
            margin: 10px;
            border: 1px solid #eee;
            border-radius: 20px;
        }

        i {
            margin-left: auto; // ✅ 왼쪽 여백을 밀어서 오른쪽으로 보냄
            cursor: pointer;
        }
    }

}
</style>