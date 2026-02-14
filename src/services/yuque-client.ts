import axios, { type AxiosInstance } from 'axios';
import type {
  YuqueUser,
  YuqueGroup,
  YuqueRepo,
  YuqueDoc,
  YuqueTocItem,
  YuqueSearchResult,
  YuqueDocVersion,
  YuqueGroupMember,
  YuqueStatistics,
  YuqueApiResponse,
} from './types.js';
import { handleYuqueError } from '../utils/error.js';

export class YuqueClient {
  private client: AxiosInstance;

  constructor(token: string, baseURL = 'https://www.yuque.com/api/v2') {
    this.client = axios.create({
      baseURL,
      headers: {
        'X-Auth-Token': token,
        'Content-Type': 'application/json',
      },
    });
  }

  // User APIs
  async getUser(): Promise<YuqueUser> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueUser>>('/user');
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async listGroups(userId: number): Promise<YuqueGroup[]> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueGroup[]>>(
        `/users/${userId}/groups`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  // Search API
  async search(query: string, type?: string): Promise<YuqueSearchResult> {
    try {
      const params: { q: string; type?: string } = { q: query };
      if (type) params.type = type;
      const response = await this.client.get<YuqueApiResponse<YuqueSearchResult>>('/search', {
        params,
      });
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  // Repo APIs
  async listUserRepos(login: string): Promise<YuqueRepo[]> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueRepo[]>>(
        `/users/${login}/repos`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async listGroupRepos(login: string): Promise<YuqueRepo[]> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueRepo[]>>(
        `/groups/${login}/repos`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async getRepo(idOrNamespace: string | number): Promise<YuqueRepo> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueRepo>>(
        `/repos/${idOrNamespace}`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async createUserRepo(login: string, data: {
    name: string;
    slug: string;
    description?: string;
    public?: number;
    type?: string;
  }): Promise<YuqueRepo> {
    try {
      const response = await this.client.post<YuqueApiResponse<YuqueRepo>>(
        `/users/${login}/repos`,
        data
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async createGroupRepo(login: string, data: {
    name: string;
    slug: string;
    description?: string;
    public?: number;
    type?: string;
  }): Promise<YuqueRepo> {
    try {
      const response = await this.client.post<YuqueApiResponse<YuqueRepo>>(
        `/groups/${login}/repos`,
        data
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async updateRepo(idOrNamespace: string | number, data: {
    name?: string;
    slug?: string;
    description?: string;
    public?: number;
  }): Promise<YuqueRepo> {
    try {
      const response = await this.client.put<YuqueApiResponse<YuqueRepo>>(
        `/repos/${idOrNamespace}`,
        data
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async deleteRepo(idOrNamespace: string | number): Promise<void> {
    try {
      await this.client.delete(`/repos/${idOrNamespace}`);
    } catch (error) {
      handleYuqueError(error);
    }
  }

  // Doc APIs
  async listDocs(repoId: string | number): Promise<YuqueDoc[]> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueDoc[]>>(
        `/repos/${repoId}/docs`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async getDoc(repoId: string | number, docId: string | number): Promise<YuqueDoc> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueDoc>>(
        `/repos/${repoId}/docs/${docId}`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async createDoc(repoId: string | number, data: {
    title: string;
    slug?: string;
    body?: string;
    format?: string;
    public?: number;
  }): Promise<YuqueDoc> {
    try {
      const response = await this.client.post<YuqueApiResponse<YuqueDoc>>(
        `/repos/${repoId}/docs`,
        data
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async updateDoc(repoId: string | number, docId: string | number, data: {
    title?: string;
    slug?: string;
    body?: string;
    public?: number;
  }): Promise<YuqueDoc> {
    try {
      const response = await this.client.put<YuqueApiResponse<YuqueDoc>>(
        `/repos/${repoId}/docs/${docId}`,
        data
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async deleteDoc(repoId: string | number, docId: string | number): Promise<void> {
    try {
      await this.client.delete(`/repos/${repoId}/docs/${docId}`);
    } catch (error) {
      handleYuqueError(error);
    }
  }

  // TOC APIs
  async getToc(repoId: string | number): Promise<YuqueTocItem[]> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueTocItem[]>>(
        `/repos/${repoId}/toc`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async updateToc(repoId: string | number, data: string): Promise<YuqueTocItem[]> {
    try {
      const response = await this.client.put<YuqueApiResponse<YuqueTocItem[]>>(
        `/repos/${repoId}/toc`,
        data
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  // Doc Version APIs
  async listDocVersions(docId: number): Promise<YuqueDocVersion[]> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueDocVersion[]>>(
        '/doc_versions',
        { params: { doc_id: docId } }
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async getDocVersion(versionId: number): Promise<YuqueDocVersion> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueDocVersion>>(
        `/doc_versions/${versionId}`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  // Group Member APIs
  async listGroupMembers(login: string): Promise<YuqueGroupMember[]> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueGroupMember[]>>(
        `/groups/${login}/users`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async updateGroupMember(login: string, userId: number, data: { role: number }): Promise<YuqueGroupMember> {
    try {
      const response = await this.client.put<YuqueApiResponse<YuqueGroupMember>>(
        `/groups/${login}/users/${userId}`,
        data
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async removeGroupMember(login: string, userId: number): Promise<void> {
    try {
      await this.client.delete(`/groups/${login}/users/${userId}`);
    } catch (error) {
      handleYuqueError(error);
    }
  }

  // Statistics APIs
  async getGroupStats(login: string): Promise<YuqueStatistics> {
    try {
      const response = await this.client.get<YuqueApiResponse<YuqueStatistics>>(
        `/groups/${login}/statistics`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async getGroupMemberStats(login: string): Promise<unknown> {
    try {
      const response = await this.client.get<YuqueApiResponse<unknown>>(
        `/groups/${login}/statistics/members`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async getGroupBookStats(login: string): Promise<unknown> {
    try {
      const response = await this.client.get<YuqueApiResponse<unknown>>(
        `/groups/${login}/statistics/books`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  async getGroupDocStats(login: string): Promise<unknown> {
    try {
      const response = await this.client.get<YuqueApiResponse<unknown>>(
        `/groups/${login}/statistics/docs`
      );
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }

  // Hello API
  async hello(): Promise<{ message: string }> {
    try {
      const response = await this.client.get<YuqueApiResponse<{ message: string }>>('/hello');
      return response.data.data;
    } catch (error) {
      handleYuqueError(error);
    }
  }
}
